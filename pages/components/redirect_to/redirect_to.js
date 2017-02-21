Page({
    data: {
        pageTitle: ''
    },
    onLoad: function(options) {
        console.log(options);
        this.setData({
            pageTitle: options.page_title
        });
    },
    goHome: function() {
        wx.switchTab({
            url: '../../index/index'
        });
    }
});