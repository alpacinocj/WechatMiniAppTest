var wxcache = require('../../../utils/wxcache.js');

Page({
    data: {
        pageTitle: '',
        expires: 0,
        cacheKey: 'token'
    },
    onLoad: function(options) {
        console.log(options);
        this.setData({
            pageTitle: options.page_title
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1        // 返回到第几层 默认1, 若大于页面数则返回首页
        });
    },
    inputChanged: function(e) {
        this.setData({
            expires: e.detail.value
        });
    },
    setCache: function(e) {
        wxcache.set(this.data.cacheKey, 'HELLOWORLD_HAHA', this.data.expires);
    },
    getCache: function(e) {
        var data = wxcache.get(this.data.cacheKey);
        console.log(data);
    },
    removeCache: function(e) {
        wxcache.remove(this.data.cacheKey);
    },
    clearCache: function(e) {
        wxcache.clear(this.data.cacheKey);
    }
});