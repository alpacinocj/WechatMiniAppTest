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
          url: config.api.test.url,
          //url: '',
          data: {},
          method: config.api.test.method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            console.log('success', res);
            wx.showToast({
                title: res.data.result.message,
                icon: 'success',
                duration: 2000
            });
          },
          fail: function(error) {
              console.log('fail', error);
            // fail
            wx.showToast({
                title: '请求失败',
                duration: 2000
            });
          },
          complete: function(error) {
            // complete
            console.log('complete', error);
          }
        })
    }
});