var Promise = require('./promise.js');

/**
   * 网络请求类
   * [request description]
   * @param  {[type]} method [description]
   * @param  {[type]} url    [description]
   * @param  {[type]} data   [description]
   * @param  {[type]} header [description]
   * @return {[type]}        [description]
   */
module.exports = function (method, url, data, header) {
    if (typeof method === 'object') {
        url = method.url;
        data = method.data;
        header = method.header;
        method = method.method;
    }
    var req = {
        method: method,
        url: url,
        header: {},
        data: {}
    }, def = {
        header: function (name, value) {
            if (value) req.header[name] = value;
            else req.header = name;
            return def;
        },
        query: function (name, value) {
            if (value) req.data[name] = value;
            else req.data = name;
            return def;
        },
        send: function (name, value) {
            if (value) req.data[name] = value;
            else req.data = name;
            return def;
        },
        use: function (middleware) {
            req = middleware.call(def, req);
            return def;
        },
        end: function (callback, done) {
            var p = new Promise(function (resolve, reject) {
                if (!callback) {
                    wx.showNavigationBarLoading();
                    callback = function (err, res) {
                        wx.hideNavigationBarLoading();
                        if (err) {
                            return reject(err);
                        }

                        var response = {};
                        if (res.statusCode != 200) {
                            response.status = res.statusCode;
                            response.message = res.data;
                            response.data = [];
                            return resolve(response)
                        }

                        // 第1次提升数据结构
                        res = res.data ? res.data : res;

                        if (res.flag && res.flag == 1 && res.result) {
                            // 解密服务器响应 TODO
                        }
                        // 第2次提升数据结构
                        response = res.result ? res.result : res;

                        // debug
                        console.log('Request: ', req.url, req.data);
                        console.log('Response: ', response);

                        resolve(response);
                    };
                }
            });
            if (!req.header['content-type']) {
                // set default content type
                req.header['content-type'] = 'application/x-www-form-urlencoded';
            }
            req.complete = done;
            req.fail = callback;
            req.success = callback.bind(req, null);
            wx.request(req);
            return p;
        }
    };
    ['get', 'post', 'put', 'delete'].forEach(function (method) {
        def[method] = (function () {
            return function (url) {
                req.url = req.url || url;
                req.method = req.method || method;
                return def;
            };
        })();
    });
    return def;
}