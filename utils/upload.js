var util = require('./util');
var messages = require('./messages');
//var qcloudSession = require('../vendor/qcloud-weapp-client-sdk/lib/session');
var config = require('../config');
var tooltip = require('./tooltip');

var upload = {

    // 多图上传
    uploadMultiple: function (tmpPathArr, uploadOptions) {
        var self = this;
        var uploadSuccess = false;
        if (util.isEmptyObject(tmpPathArr)) {
            return false;
        }
        var tmpPath = tmpPathArr.shift();
        var noop = function () { };
        var defaultOptions = {
            url: '',
            name: 'data',
            formData: {},
            header: {},
            callback: noop
        };

        var options = util.extend({}, defaultOptions, uploadOptions);
        if (options.url == '') {
            throw new Error('请正确配置上传接口地址');
        }

        wx.uploadFile({
            url: options.url,
            filePath: tmpPath,
            name: options.name,
            formData: options.formData,
            header: options.header,
            success: function (res) {
                var response;
                if (res.data && typeof res.data == 'string') {
                    res = JSON.parse(res.data);
                }
                /*var session = qcloudSession.get();
                if (res.flag && res.flag == 1 && res.result) {
                    res.result = util.aesDecrypt(
                        res.result,
                        session.dynamic_key
                    );
                    if (typeof res.result == 'string') {
                        res.result = JSON.parse(res.result);
                    }
                    response = res.result;
                } else {
                    response = res.result;
                }*/

                response = res.result;
                if (response.status == 200) {
                    uploadSuccess = true;
                    options.callback(null, response);
                } else {
                    uploadSuccess = false;
                    options.callback(response, null);
                }
            },
            fail: function (res) {
                console.log('fail');
                uploadSuccess = false;
                if (res.message == undefined) {
                    res.message = messages.image_upload_fail;
                }
                options.callback(res, null);
            },
            complete: function () {
                // 递归调用
                while (tmpPathArr.length && uploadSuccess) {
                    self.uploadMultiple(tmpPathArr, uploadOptions);
                }
            }
        });
    },

    // 上传图片到服务器
    uploadSingle: function (uploadOptions) {

        var noop = function () { };

        var defaultOptions = {
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            url: '',
            name: 'data',
            formData: {},
            header: {},
            success: noop,
            fail: function(res) {
                // 默认上传失败处理: 提示错误信息
                tooltip.showError(res.message);
            },
        };

        var options = util.extend({}, defaultOptions, uploadOptions);

        // 如果没有设置url参数, 则默认读取配置文件上传图片的接口
        if (options.url == undefined || options.url == '') {
            options.url = config.api.uploadImg.url;
        }

        wx.chooseImage({
            count: 1,   // 只能选1张
            sizeType: options.sizeType,
            sourceType: options.sourceType,
            success: function (res) {
                // success
                var tempFilePath = res.tempFilePaths[0];
                tooltip.showBusy(messages.file_is_uploading);
                wx.uploadFile({
                    url: options.url,
                    filePath: tempFilePath,
                    name: options.name,
                    header: options.header,
                    formData: options.formData,
                    success: function (res) {
                        // success
                        var response;

                        if (res.data) {
                            res = res.data;
                        }

                        if (typeof res == 'string') {
                            res = JSON.parse(res);
                        }

                        //var session = qcloudSession.get();
                        if (res.flag != undefined && res.result != undefined) {
                            if (res.flag == 1) {
                                // 解密 TODO
                                /*response = util.aesDecrypt(
                                    res.result,
                                    session.dynamic_key
                                );
                                
                                if(typeof response == 'string') {
                                    response = JSON.parse(response);
                                }*/
                            } else {
                                response = res.result;
                            }
                        } else {
                            response = res;
                        }

                        if(response.status == 200) {
                            // 上传成功后返回图片地址为response.message
                            options.success(response);
                        } else {
                            options.fail(response);
                        }

                    },
                    fail: function () {
                        // fail
                        console.log('upload img fail');
                    },
                    complete: function() {
                        tooltip.hide();
                    }
                });
            },
            fail: function () {
                // fail
                console.log('choose img fail');
            }
        });
    }
};

module.exports = upload;
