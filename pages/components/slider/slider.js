Page({
    data: {
        pageTitle: '',
        isChanged: false,
        selectedValue: ''
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
    sliderChange: function(e) {
        this.setData({
            isChanged: true,
            selectedValue: e.detail.value
        });
    }
});