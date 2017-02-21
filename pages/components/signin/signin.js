var messages = require('../../../utils/messages.js');
var config = require('../../../config.js');

Page({
    data: {
        pageTitle: '',
        loginSuccess: false,
        inputValues: {},
        userInfo: {},
        userType: [
            {
                name: 'shipper',
                title: '发货人',
                checked: true
            },
            {
                name: 'driver',
                title: '承运人',
                checked: false
            }
        ]
    },
    onLoad: function (options) {
        console.log(options);
        this.setData({
            pageTitle: options.page_title
        });
    },
    radioChange: function(e) {
        this.data.inputValues[e.target.id] = e.detail.value;
    },
    formSubmit: function (e) {
        var that = this;
        var data = e.detail.value;
        data.client_type = this.data.inputValues.client_type != undefined ? this.data.inputValues.client_type : 'shipper';

        if (data.phone.length == 0) {
            wx.showToast({
                title: messages.phone_can_not_empty
            });
            return;
        }
        if (data.password.length == 0) {
            wx.showToast({
                title: messages.password_can_not_empty
            });
            return;
        }

        // 校验手机号格式 TODO
        // 校验密码格式 TODO

        // 请求登录接口
        wx.request({
            url: config.api_signin.url,
            method: config.api_signin.method,
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    var msg;
                    if (res.data.status == 200) {
                        msg = messages.signin_success;
                        that.setData({
                            loginSuccess: true,
                            userInfo: res.data.data
                        });
                        console.log(that.data);
                    } else {
                        msg = res.data.message;
                        that.setData({
                            loginSuccess: false,
                            userInfo: {}
                        });
                    }
                    wx.showToast({
                        title: msg,
                        duration: 2000
                    });
                } else {
                    wx.showToast({
                        title: messages.api_request_fail
                    });
                }
                return;
            },
            fail: function () {
                wx.showToast({
                    title: messages.api_request_fail
                });
                return;
            },
            complete: function () {
                // do nothing
                return;
            }
        });

    },
    formReset: function () {
        this.setData({
            loginSuccess: false,
            inputValues: {},
            userInfo: {}
        });
        return;
    }
});