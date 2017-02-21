var messages = require('../../../utils/messages.js');

Page({
    data: {
        pageTitle: '',
        model: '',  // 手机型号
        pixelRatio: '', //设备像素比
        windowWidth: '', // 窗口宽度
        windowHeight: '', // 窗口高度
        language: '', // 微信设置的语言
        version: '', // 微信版本号
        system: '', // 操作系统版本
        platform: '' // 客户端平台
    },
    onLoad: function(options) {
        var that = this;
        console.log(options);
        this.setData({
            pageTitle: options.page_title
        });
        // 获取系统信息
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    model: res.model,
                    pixelRatio: res.pixelRatio,
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight,
                    language: res.language,
                    version: res.version,
                    system: res.system,
                    platform: res.platform
                });
            },
            fail: function() {
                wx.showToast({
                    title: messages.get_system_info_fail
                });
                return;
            },
            complete: function() {
                return;
            }
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1        // 返回到第几层 默认1, 若大于页面数则返回首页
        });
    }
});