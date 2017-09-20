Page({
    data: {
        pageTitle: '',
        areaShow: false,
        provinces: [
            {
                id: 1,
                name: '广东'
            },
            {
                id: 2,
                name: '湖南'
            }
        ],
        cities: [
            {
                id: 11,
                name: '深圳'
            },
            {
                id: 12,
                name: '广州'
            }
        ],
        districts: [
            {
                id: 111,
                name: '宝安区'
            },
            {
                id: 1,
                name: '南山区'
            }
        ],
        value: [0,0,0],
    },
    bindChange: function (e) {
        const val = e.detail.value
        
    },
    chooseArea: function() {
        this.setData({
            areaShow: true
        });
        console.log(this.data.areaShow);
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
    }
});