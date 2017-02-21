var messages = require('../../../utils/messages.js');

Page({
    data: {
        pageTitle: '',
        phone: ''
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
    inputChanged: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    callPhone: function() {
        var phone = this.data.phone;
        if(phone.length == 0) {
            wx.showToast({
                title: messages.phone_can_not_empty
            });
            return;
        }

        // 调用拨号接口
        wx.makePhoneCall({
            phoneNumber: phone
        });
    }
});