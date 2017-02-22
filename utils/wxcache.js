/*
本地缓存 新增过期机制
wxcache.has(key);
wxcache.get(key);
wxcache.set(key, value, expireSeconds);
wxcache.remove(key);
wxcache.clear();
*/
var wxcache = {

    expire_suffix: '_expires',

    getExpireKey: function(key) {
        return key.toString() + this.expire_suffix;
    },
    
    // 是否有某个KEY的缓存
    has: function(key) {
        try {
            var data = wx.getStorageSync(key);
            return data ? true : false;
        } catch(e) {
            console.log(e);
            return false;
        }
    },
    
    // 获取缓存
    get: function(key) {
        var data = '';
        var expires = 0;
        var expireKey = this.getExpireKey(key);
        var curTimestamp = parseInt(Date.parse(new Date()) / 1000);
        try {
            expires = parseInt(wx.getStorageSync(expireKey));
            if(expires > 0 && expires < curTimestamp) {
                // 已过期
                console.log('cache expired');
                this.remove(key);
                this.remove(expireKey);
            }
            data = wx.getStorageSync(key);
        } catch(e) {
            console.log(e);
        }
        return data;
    },

    // 设置缓存
    set: function(key, value, expireSeconds) {
        var expireKey = this.getExpireKey(key);
        wx.setStorage({
            key: key,
            data: value,
            success: function(res) {
                console.log(res);
                if(expireSeconds != undefined && expireSeconds > 0) {
                    var futureTimestamp = parseInt(Date.parse(new Date()) / 1000) + parseInt(expireSeconds);
                    wx.setStorageSync(expireKey, futureTimestamp);
                }
                return;
            }
        });
    },

    // 删除缓存
    remove: function(key) {
        var expireKey = this.getExpireKey(key);
        try {
            wx.removeStorageSync(key);
            wx.removeStorageSync(expireKey);
        } catch(e) {
            console.log(e);
        }
    },

    // 清空本地缓存
    clear: function() {
        wx.clearStorage();
    }

};

module.exports = wxcache;