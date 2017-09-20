var messages = require('../../../utils/messages.js');
var validate = require('../../../utils/validate.js');
var config = require('../../../config.js');

Page({
    data: {
        pageTitle: '',
        expireSeconds: 60,
        disabled: true,
        loading: false,
        inputValues: {},
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
        console.log(e);
        this.data.inputValues[e.target.id] = e.detail.value;
    },
    formSubmit: function (e) {
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
        if (data.captcha.length == 0) {
            wx.showToast({
                title: messages.captcha_can_not_empty
            });
            return;
        }
        // 校验手机号格式 TODO
        // 校验密码格式 TODO
        // 校验验证码格式 TODO

        // 请求注册接口
        wx.request({
            url: config.api.signup.url,
            method: config.api.signup.method,
            data: {
                phone: data.phone,
                password: data.password,
                captcha: data.captcha,
                client_type: data.client_type
            },
            header: {
                // 默认的content-type为application/json
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    var ms = 2000;
                    if (res.data.status == 200) {
                        wx.showToast({
                            title: messages.signup_success,
                            duration: ms
                        });
                        setTimeout(function() {
                            wx.navigateTo({
                                url: '../signin/signin'
                            });
                        }, ms);
                    } else {
                        wx.showToast({
                            title: res.data.message,
                            duration: ms
                        });
                    }
                } else {
                    wx.showToast({
                        title: res.errMsg
                    });
                }
                return;
            },
            fail: function () {
                wx.showToast({
                    title: messages.signup_request_fail
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
            inputValues: {}
        });
    },
    getCaptcha: function (e) {

        var that = this;

        this.setData({
            loading: !this.data.loading,
            disabled: !this.data.disabled
        });

        var phone = this.data.inputValues.phone || null;

        // 请求验证码接口
        wx.request({
            url: config.api.captcha.url,
            method: config.api.captcha.method,
            data: {
                phone: phone,
                action: 'signup',
                client_type: 'shipper'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    var msg = res.data.status == 200 ? messages.captcha_send_success : res.data.message;
                    wx.showToast({
                        title: msg,
                        duration: 2000
                    });
                } else {
                    wx.showToast({
                        title: res.errMsg
                    });
                }
                return;
            },
            fail: function () {
                wx.showToast({
                    title: messages.captcha_request_fail
                });
                return;
            },
            complete: function () {
                that.setData({
                    loading: !that.data.loading,
                    disabled: !that.data.disabled
                });
                return;
            }
        });
    },
    afterBlur: function (e) {
        var id = e.target.id;
        var data = e.detail.value;
        if (id == 'phone') {
            var result = validate.isPhone(data);
            this.setData({
                disabled: !result
            });
        }
    },
    afterInput: function (e) {
        var key = e.target.id;
        var value = e.detail.value;
        this.data.inputValues[key] = value;
    }
});