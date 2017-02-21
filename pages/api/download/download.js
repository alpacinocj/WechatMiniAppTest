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
                    // TODO
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
        // 先从缓存获取看是否已保存过
        var cacheKey = this.data.fileStoragekey;
        var that = this;
        wx.getStorage({
            key: cacheKey,
            success: function (res) {
                // success
                if (!res.data) {
                    // save file and set storage
                    wx.saveFile({
                        tempFilePath: filePath,
                        success: function(res) {
                            var savedFilePath = res.savedFilePath;
                            wx.setStorage({
                              key: cacheKey,
                              data: savedFilePath
                            });
                        }
                    });
                }
                // set data
                that.setData({
                    downloadedSource: filePath
                });
            },
            faile: function (res) {
                // fail
                return;
            }
        })
    }
});