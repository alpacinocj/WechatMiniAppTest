var bmap = require('../../../vendor/bdmap-wx-jssdk1.0/bmap-wx.min');
var BMap = {};

Page({
    data: {
        pageTitle: '',
        searchLocation: ''
    },
    onLoad: function (options) {
        console.log(options);
        this.setData({
            pageTitle: options.page_title
        });
        BMap = new bmap.BMapWX({
            ak: 'KzAcUmNrToUIjqYWH685Vj8LUn7a4HUn'
        });
        
    },
    goBack: function () {
        wx.navigateBack({
            delta: 1        // 返回到第几层 默认1, 若大于页面数则返回首页
        });
    },
    searchInputChanged: function(e) {
        this.setData({
            searchLocation: e.detail.value
        });
    },
    // POI搜索
    toSearchLocation: function() {
        var self = this;
        if(this.data.searchLocation == '') {
            wx.showModal({
                title: '',
                content: '请输入搜索关键词'
            });
            return;
        }

        var onSearchSuccess = function(data) {
            console.log(data)
        };

        var onSearchFail = function() {
            console.log(data)
        }

        // 发起POI检索请求
        BMap.search({
            query: self.data.searchLocation,
            fail: onSearchFail,
            success: onSearchSuccess,
            // 此处需要在相应路径放置图片文件 
            iconPath: '../../../icons/location.png',
            // 此处需要在相应路径放置图片文件 
            iconTapPath: '../../../icons/location.png'
        });
    }
});