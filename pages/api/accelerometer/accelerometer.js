Page({
    data: {
        pageTitle: '',
        x: 0,
        y: 0,
        z: 0
    },
    onReady: function() {
        var that = this;
        // 监听重力感应数据
        wx.onAccelerometerChange(function(res){
          that.setData({
              x: res.x,
              y: res.y,
              z: res.z
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