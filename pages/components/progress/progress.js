Page({
    data: {
        pageTitle: '',
        percent: 50,            // 百分比值
        showInfo: true,         // 是否显示右侧百分比值
        strokeWidth: 6,         // 进度条宽度
        active: true,           // 进度条从左至右的动画
        curColor: '',
        colors: ['#09BB07', 'red', 'blue', 'orange', 'green']    // 进度条颜色
    },
    onLoad: function(options) {
        console.log(options);
        this.setData({
            pageTitle: options.page_title,
            curColor: this.data.colors[0]
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1        // 返回到第几层 默认1, 若大于页面数则返回首页
        });
    },
    switchChanged: function(e) {
        var id = e.target.id;
        if(id == 'showInfo') {
            this.setData({
                showInfo: e.detail.value
            });
        } else if(id == 'active') {
            this.setData({
                active: e.detail.value
            });
        }
    },
    sliderChanged: function(e) {
        this.setData({
            strokeWidth: e.detail.value
        });
    },
    radioChanged: function(e) {
        this.setData({
            curColor: e.detail.value
        });
    }
});