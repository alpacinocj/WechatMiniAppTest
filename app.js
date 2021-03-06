//app.js
var config = require('./config');
App({
  // 监听小程序初始化
  onLaunch: function () {
    console.log('app launching...');
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var self = this;
    /*setInterval(function() {
      self.testBackRunningTime();
    }, 5000);*/
  },
  // 监听小程序显示
  onShow: function () {
    console.log('show page ...');
  },
  // 监听小程序隐藏 (从前台进入后台)
  onHide: function () {
    console.log('hide to backend');
  },
  // 监听错误
  onError: function (msg) {
    //console.log(msg);   // 系统已经内置监听错误
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  testBackRunningTime: function() {
    wx.request({
      url: config.api.backRunning.url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
      },
      fail: function(res) {
        // fail
        console.log(res);
      },
      complete: function(res) {
        // complete
      }
    })
  }
})