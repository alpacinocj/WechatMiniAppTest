Page({
    data: {
        pageTitle: '',
        navigationBarTitle: '动态设置页面标题'
    },
    onShow: function() {
        var that = this;
        wx.setNavigationBarTitle({
            title: that.data.navigationBarTitle
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