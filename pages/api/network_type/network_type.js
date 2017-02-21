Page({
    data: {
        pageTitle: '',
        networkType: ''     // 网络状态
    },
    onLoad: function(options) {
        var that = this;
        console.log(options);
        this.setData({
            pageTitle: options.page_title
        });
        wx.getNetworkType({
          success: function(res) {
            that.setData({
                networkType: res.networkType
            });
          }
        })
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1        // 返回到第几层 默认1, 若大于页面数则返回首页
        });
    }
});