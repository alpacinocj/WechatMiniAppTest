const config = require('../../../config.js');

Page({
    data: {
        pageTitle: ''
    },
    onLoad: function(options) {
        console.log(options);
        this.setData({
            pageTitle: options.page_title
        });
    },
    requestApi: function() {
        wx.request({
          url: config.api_test.url,
          //url: '',
          data: {},
          method: config.api_test.method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);
            wx.showToast({
                title: res.data.message,
                icon: 'success',
                duration: 2000
            });
          },
          fail: function() {
            // fail
            wx.showToast({
                title: '请求失败',
                duration: 2000
            });
          },
          complete: function() {
            // complete
          }
        })
    }
});