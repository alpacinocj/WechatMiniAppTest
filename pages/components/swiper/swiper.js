Page({
    data: {
        pageTitle: '',
        showDots: true,         // 是否显示指示点
        autoPlay: true,         // 是否自动播放
        interval: 2000,         // 切换间隔时间(毫秒)
        duration: 500,          // 滑动动画时长(毫秒)
        circular: true,         // 是否启用衔接滑动(循环播放, 最后一帧后衔接第一帧, 而不是重新回到第一帧)
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
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
    switchChanged: function(e) {
        var id = e.target.id;
        var value = e.detail.value;
        if(id == 'showDots') {
            this.setData({
                showDots: value
            });
        } else if(id == 'autoPlay') {
            this.setData({
                autoPlay: value
            });
        } else if(id == 'loopPlay') {
            this.setData({
                circular: value
            });
        }
    },
    sliderChanged: function(e) {
        this.setData({
            interval: e.detail.value
        });
    }
});