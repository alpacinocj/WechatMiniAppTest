Page({
    data: {
        pageTitle: '',
        longitude: 113.324520,      // 经度
        latitude: 23.099994,        // 纬度
        markers: [
            {
                id: 0,
                longitude: 113.324520,
                latitude: 23.099994,
                iconPath: '/icons/location.png',
                width: 50,
                height: 50
            }
        ],
        polyLine: [
            {
                points: [
                    {
                        longitude: 114.036216,
                        latitude: 22.616857
                    },
                    {
                        longitude: 114.323904,
                        latitude: 30.534247,
                    },
                    {
                        longitude: 121.436256,
                        latitude: 31.159206,
                    },
                    {
                        longitude: 116.433101,
                        latitude: 39.909906,
                    }
                ],
                color: '#ff0000',
                width: 6,
                dottedLine: true
            }
        ],
        controls: [
            {
                id: 1,
                iconPath: '/icons/location.png',
                clickable: true,
                position: {
                    left: 10,
                    top: 10,
                    width: 50,
                    height: 50
                }
            }
        ]
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