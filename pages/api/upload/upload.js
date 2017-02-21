var config = require('../../../config.js');
var messages = require('../../../utils/messages.js');

Page({
    data: {
        pageTitle: '',
        imgCount: 1,
        choosedImg: '',
        choosedImgInfo: '',
        sourceType: [
            {
                name: 'default',
                title: '默认'
            },
            {
                name: 'album',
                title: '相册'
            },
            {
                name: 'camera',
                title: '相机'
            }
        ],
        sizeType: [
            {
                name: 'default',
                title: '默认'
            },
            {
                name: 'original',
                title: '原图'
            },
            {
                name: 'compressed',
                title: '缩略图'
            }
        ],
        checkedSourceType: 'default',
        checkedSizeType: 'default'
    },
    onLoad: function (options) {
        console.log(options);
        this.setData({
            pageTitle: options.page_title
        });
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1        // 返回到第几层 默认1, 若大于页面数则返回首页
        });
    },
    radioChanged: function (e) {
        var id = e.target.id;
        if (id == 'sourceType') {
            this.setData({
                checkedSourceType: e.detail.value
            });
        } else if (id == 'sizeType') {
            this.setData({
                checkedSizeType: e.detail.value
            });
        } else {
            return;
        }
    },
    chooseImage: function (e) {
        var that = this;
        // 选择图片
        wx.chooseImage({
            count: that.data.imgCount,   // 默认9
            sizeType: that.data.checkedSizeType,
            sourceType: that.data.checkedSourceType,
            success: function (res) {
                console.log(res);
                /*
                {
                    errMsg: "chooseImage:ok",
                    tempFilePaths: [
                        "wxfile://tmp_654444029o6zAJs3JJKQhYk5mccRfuQm6EWeM1487560758206.png"
                    ]
                }
                */
                var path = res.tempFilePaths[0];
                that.setData({
                    choosedImg: path
                });
                wx.getImageInfo({
                    src: path,
                    success: function (res) {
                        // success
                        console.log(res);
                        that.setData({
                            choosedImgInfo: res
                        });
                    },
                    fail: function () {
                        // fail
                    },
                    complete: function () {
                        // complete
                    }
                })
            },
            fail: function () {
                console.log('choose image fail...');
            },
            complete: function () {
                // do nothing
                return;
            }
        });
    },
    uploadImage: function () {
        var that = this;
        var choosedImg = this.data.choosedImg;

        if (choosedImg == '') {
            wx.showToast({
                title: messages.please_choose_img
            });
            return;
        }

        console.log(config.api_upload_img.url);
        // 上传图片
        wx.uploadFile({
            url: config.api_upload_img.url,
            filePath: choosedImg,    // 要上传文件资源的路径
            name: 'data',  // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容, $_FILES[name]
            header: {
                // 设置请求的 header
                //'content-type': 'multipart/form-data'
                //'content-type': 'application/x-www-form-urlencoded'
            },
            formData: {
                // HTTP 请求中其他额外的 form data
                data: ''
            },
            success: function (res) {
                // success
                console.log(res);
                if (res.statusCode == 200) {
                    that.setData({
                        choosedImg: '',
                        choosedImgInfo: '',
                        checkedSourceType: 'default',
                        checkedSizeType: 'default'
                    });
                    wx.showToast({
                        title: messages.image_upload_success
                    });
                } else {
                    wx.showToast({
                        title: messages.image_upload_fail
                    });
                }
                return;
            },
            fail: function () {
                // fail
                console.log('upload fail ...');
            },
            complete: function () {
                // complete
            }
        });
    }
});