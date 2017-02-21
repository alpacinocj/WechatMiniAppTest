Page({
    data: {
        pageTitle: '',
        index: 0,
        fruitsArray: ['苹果', '梨子', '香蕉', '西瓜', '柠檬'],
        fruits: [
            {
                name: 'apple',
                title: '苹果'
            },
            {
                name: 'pear',
                title: '梨子'
            },
            {
                name: 'banana',
                title: '香蕉'
            },
            {
                name: 'watermelon',
                title: '西瓜'
            },
            {
                name: 'lemon',
                title: '柠檬'
            }
        ],
        startTime: '00:00',
        endTime: '24:00',
        curTime: '09:36',
        startDate: '1900-00-00',
        endDate: '2050-00-00',
        curDate: '2017-02-17'
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
    normalSelectorChanged: function(e) {
        this.setData({
            index: e.detail.value
        });
    },
    timeSelectorChanged: function(e) {
        this.setData({
            curTime: e.detail.value
        });
    },
    dateSelectorChanged: function(e) {
        this.setData({
            curDate: e.detail.value
        });
    }
});