Page({
    data: {
        pageTitle: '',
        title: 'hello world',
            icon: 'success',
            duration: 3000,
            mask: true
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
            title: e.detail.value
        });
    },
    radioChanged: function(e) {
        console.log(e);
        this.setData({
            icon: e.detail.value
        });
    },
    sliderChanged: function(e) {
        this.setData({
            duration: e.detail.value
        });
    },
    switchChanged: function(e) {
        console.log(e);
        this.setData({
            mask: e.detail.value
        });
        console.log(this.data);
    },
    showToast: function() {
        var that = this;
        // 消息提示框
        wx.showToast({
            title: that.data.title,
            icon: that.data.icon,
            duration: that.data.duration,
            mask: that.data.mask
        });
    },
    hideToast: function() {
        wx.hideToast();
    },
    showModalTips: function() {
        // 模态弹窗提示
        wx.showModal({
            title: '模态框提示',
            content: 'hello world',
            showCancel: true,
            cancelText: '取消',   // cancelText length should not large then 4
            cancelColor: '#ff0000',
            confirmText: '确定',
            confirmColor: '#0000ff',
            success: function(res) {
                console.log(res);   // {confirm: true, errMsg: 'showModal:ok'}
                if(res.confirm) {
                    // do something
                    console.log('用户点了确定按钮');
                } else {
                    console.log('用户点了取消按钮');
                }
            },
            fail: function() {
                return;
            },
            complete: function() {
                return;
            }
        });
    }
});