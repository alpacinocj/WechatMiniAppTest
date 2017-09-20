// 定义项目开发环境
const APP_ENV = 'local';

// 全局配置对象
var config = {};

var apiHost, socketHost, uploadHost, downloadHost;
var apiVersion;

if (APP_ENV == 'local') {

    // 本地
    apiHost = 'http://yunbei.api.com';
    socketHost = 'wss://yunbei.api.com';
    uploadHost = 'https://14592619.qcloud.la';
    downloadHost = 'http://yunbei.api.com';

    apiVersion = 'v2_0';

} else if (APP_ENV == 'test') {

    // 测试
    apiHost = 'http://api.dev.afd56.com.cn';
    socketHost = 'wss://api.dev.afd56.com.cn';
    uploadHost = 'http://api.dev.afd56.com.cn';
    downloadHost = 'http://api.dev.afd56.com.cn';

    apiVersion = 'v2_0';

} else if (APP_ENV == 'production') {

    // 正式 TODO

}

config.api = {

    // 测试接口地址
    test: {
        method: 'GET',
        url: apiHost + '/' + apiVersion + '/tests/index'
    },

    // 测试后台运行时长
    backRunning: {
        method: 'GET',
        url: apiHost + '/' + apiVersion + '/tests/error'
    },

    // 用户注册接口
    signup: {
        method: 'POST',
        url: apiHost + '/' + apiVersion + '/users/signup'
    },

    // 登录接口
    signin: {
        method: 'POST',
        url: apiHost + '/' + apiVersion + '/users/signin'
    },

    // 发送验证码接口
    captcha: {
        method: 'GET',
        url: apiHost + '/' + apiVersion + '/commons/captcha'
    },

    // 图片上传接口
    uploadImg: {
        method: 'POST',
        url: apiHost + '/' + apiVersion + '/commons/img_upload'
    },

    // 证件识别
    cardOcr: {
        method: 'POST',
        url: apiHost + '/' + apiVersion + '/tests/certificate_identify'
    }
};

module.exports = config;