/*
消息提示
*/

var tooltip = {

    duration: 2000,     // 默认显示时间2s

    // 普通消息提示
    showSuccess: function(msg, time) {
        var self = this;
        wx.showToast({
            title: msg,
            icon: 'success',
            duration: time != undefined && time > 0 ? time : self.duration
        });
    },

    // 普通模态框提示
    showModal: function(msg, title, confirmCallback) {
        var t = title;
        if(arguments[1] == undefined) {
            t = '';
        }
        wx.showModal({
            title: t,
            content: msg,
            success: function(res) {
                if(res.confirm) {
                    confirmCallback();
                }
            }
        });
    },

    // 等待提示
    showBusy: function(msg) {
        if(msg == undefined) {
            msg = '';
        }
        wx.showToast({
            title: msg,
            icon: 'loading',
            duration: 10000
        });
    },

    // 错误提示(模态框)
    showError: function(error, title) {
        wx.hideToast();
        var paramsObj = {};
        if(title != undefined && title != '') {
            paramsObj.title = title;
        }
        paramsObj.content = error;
        paramsObj.showCancel = false;
        wx.showModal(paramsObj);
    },

    // 隐藏提示
    hide: function() {
        wx.hideToast();
    }

};

module.exports = tooltip;