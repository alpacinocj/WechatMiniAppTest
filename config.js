// 定义项目开发环境
const APP_ENV = 'local';

// 全局配置对象
var config;

if (APP_ENV == 'local') {

    // 本地
    const API_HOST = 'http://yunbei.api.com';
    const SOCKET_HOST = 'wss://yunbei.api.com';
    const UPLOAD_HOST = 'https://14592619.qcloud.la';
    const DOWNLOAD_HOST = 'http://yunbei.api.com';

    config = {

        version: '1.0',

        // 测试接口地址
        api_test: {
            method: 'GET',
            url: API_HOST + '/v2_0/tests/success'
        },

        // 用户注册接口
        api_signup: {
            method: 'POST',
            url: API_HOST + '/v2_0/users/signup'
        },

        // 登录接口
        api_signin: {
            method: 'POST',
            url: API_HOST + '/v2_0/users/signin'
        },

        // 发送验证码接口
        api_captcha: {
            method: 'GET',
            url: API_HOST + '/v2_0/commons/captcha'
        },

        // 图片上传接口
        api_upload_img: {
            method: 'POST',
            url: UPLOAD_HOST + '/upload'
        },

    };

} else if (APP_ENV == 'test') {

    // 测试
    const API_HOST = 'http://api.test.afd56.com.cn';
    const SOCKET_HOST = 'wss://api.test.afd56.com.cn';
    const UPLOAD_HOST = 'http://api.test.afd56.com.cn';
    const DOWNLOAD_HOST = 'http://api.test.afd56.com.cn';

    config = {

        version: '1.0',

        // 测试接口地址
        api_test: {
            method: 'GET',
            url: API_HOST + '/v2_0/tests/success'
        },

        // 用户注册接口
        api_signup: {
            method: 'POST',
            url: API_HOST + '/v2_0/users/signup'
        },

        // 登录接口
        api_signin: {
            method: 'POST',
            url: API_HOST + '/v2_0/users/signin'
        },

        // 发送验证码接口
        api_captcha: {
            method: 'GET',
            url: API_HOST + '/v2_0/commons/captcha'
        },

        // 图片上传接口(base64格式)
        api_upload_img: {
            method: 'POST',
            url: UPLOAD_HOST + '/v2_0/commons/img_upload'
        },

    };

} else if (APP_ENV == 'production') {

    // 正式 TODO

}

module.exports = config;