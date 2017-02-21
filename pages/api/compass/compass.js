Page({
    data: {
        pageTitle: '',
        direction: 0
    },
    onReady: function() {
        var that = this;
        // 监听罗盘数据
        wx.onCompassChange(function(res) {
            that.setData({
                direction: parseInt(res.direction)
            });
        });
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
    }
});