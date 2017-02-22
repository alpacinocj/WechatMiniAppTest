var request = require('../../../utils/request.js');
var config = require('../../../config.js');

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
    goBack: function() {
        wx.navigateBack({
            delta: 1        // 返回到第几层 默认1, 若大于页面数则返回首页
        });
    },
    requestTest: function() {
        /****************************
        参考: http://javascript.ruanyifeng.com/advanced/promise.html
        发送请求示例
        调用方法:
        1. GET请求
        request().get(url).query(paramsObject).header(headerObject).end().then(successCallback, failCallback).then(completeCallback)
        2. POST请求
        request().post(url).query(paramsObject).header(headerObject).end().then(successCallback, failCallback).then(completeCallback);
        使用说明: 
        1. 先要引入request请求类, 注意: request返回的是一个方法而非一个对象;
        2. request采用了ES6 Promise语法封装;
        3. 函数调用采用链式写法, 其中query(), header()非必须调用;
        4. query()方法用来设置请求参数, header()方法用来设置请求头;
        5. then()方法用来设置请求回调, 这里有点难理解, 但也试着解释一下: 
            wx.request()发起网络请求实际上可以看做是有两个异步任务
            1. 请求成功(success) / 请求失败(fail);
            2. 请求完成(complete)
            这里request()采用Promise语法之后, 每一步任务完成后都会返回一个Promise对象, 
            而根据Promise语法需调用then()方法来指定回调
            第一步任务会返回两种状态: resolved(已完成)或rejected(失败)
            then()方法接收两个函数作为参数, 第一个为resolve的回调(必选), 第二个为reject的回调(可选)
            第二个then()为complete的回调      
        *****************************/
        request()
        //.get('')
        .get(config.api_test.url)
        //.post(config.api_test.url)
        .query({name:'jack'})
        .header({'content-type': 'application/json'})
        .end()
        .then(
            function(res) {
                // success
                console.log('request success');
                console.log(res);
            },
            function(res) {
                // fail
                console.log('request fail');
                console.log(res);
            }
        )
        .then(
            // complete
            function() {
                console.log('request complete');
            }
        );
    }
});