var messages = require('../../../utils/messages.js');

Page({
    data: {
        pageTitle: '',
        downloadedSource: '',
        fileStorageKey: 'test_download_file'
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
    downloadSource: function () {
        var that = this;
        // 下载资源
        wx.downloadFile({
            url: "http://www.afd56.com.cn/PCimages/joinbsjks.jpg",
            type: 'image', // 下载资源的类型，用于客户端识别处理，有效值：image/audio/video
            // header: {}, // 设置请求的 header
            success: function (res) {
                // success
                console.log(res);   // {statusCode: xxx, errMsg: xxx, tempFilePath: xxx}
                if (res.statusCode == 200) {
                    that.saveDownloadFile(res.tempFilePath);
                    wx.showToast({
                        title: messages.download_source_success
                    });
                } else {
                    wx.showToast({
                        title: messages.download_source_fail
                    });
                }
            },
            fail: function () {
                // fail
                wx.showToast({
                    title: messages.download_source_fail
                });
            },
            complete: function () {
                // complete
                return;
            }
        });
    },
    saveDownloadFile: function (filePath) {
        console.log('save start');
        // 先从缓存获取看是否已保存过
        var cacheKey = this.data.fileStorageKey;
        var that = this;
        wx.getStorage({
            key: cacheKey,
            success: function (res) {
                console.log('get storage success');
                // success
                if (!res.data) {
                    // 如果缓存为空则保存文件并更新缓存
                    wx.saveFile({
                        tempFilePath: filePath,
                        success: function(res) {
                            console.log('save success');
                            var savedFilePath = res.savedFilePath;
                            wx.setStorage({
                              key: cacheKey,
                              data: savedFilePath
                            });
                        },
                        faile: function() {
                            console.log('save fail');
                        }
                    });
                }
                // set data
                that.setData({
                    downloadedSource: filePath
                });
            },
            fail: function (res) {
                // fail
                console.log('get storage fail');
                return;
            }
        })
    }
});