Page({
    data: {
        pageTitle: '',
        address: ''
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
    chooseAddress: function () {
        if (wx.chooseAddress) {
            wx.chooseAddress({
                success: function (res) {
                    // success
                    console.log(res);
                },
                fail: function (res) {
                    // fail
                },
                complete: function (res) {
                    // complete
                }
            })
        }
    }
});