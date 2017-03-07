var messages = require('../../../utils/messages.js');

Page({
    data: {
        pageTitle: '',
        longitude: 0,
        latitude: 0,
        speed: 0,
        accuracy: 0
    },
    onLoad: function (options) {
        console.log(options);
        var that = this;
        // 获取当前位置
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                that.setData({
                    longitude: res.longitude,
                    latitude: res.latitude,
                    speed: res.speed,
                    accuracy: res.accuracy
                });
                return;
            },
            fail: function () {
                console.log('用户未授权获取地理位置');
                // show tips
                wx.showToast({
                    title: messages.get_location_fail
                });
                return;
            },
            complete: function () {
                // do nothing
                return;
            }
        });
        this.setData({
            pageTitle: options.page_title
        });
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1        // 返回到第几层 默认1, 若大于页面数则返回首页
        });
    },
    openLocation: function () {
        var that = this;
        // 使用微信内置地图查看位置
        wx.openLocation({
            longitude: that.data.longitude,
            latitude: that.data.latitude
        });
    }
});