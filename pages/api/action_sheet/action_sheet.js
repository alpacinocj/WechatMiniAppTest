Page({
    data: {
        pageTitle: '',
        itemList: ['篮球', '足球', '羽毛球', '乒乓球']
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
    showActionSheet: function () {
        var that = this;
        // 显示操作菜单
        wx.showActionSheet({
            itemList: that.data.itemList,
            itemColor: '#ff0000',
            success: function (res) {
                console.log(res);
                if (res.cancel) {
                    // 取消选择 {errMsg: 'showActionSheet:ok', cancel: true}
                    return;
                } else {
                    // 确认选择 {errMsg: 'showActionSheet:ok', tapIndex: 0}
                    var index = res.tapIndex;
                    var data = that.data.itemList[index];
                    wx.showToast({
                        title: '选择了' + data
                    })
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
});