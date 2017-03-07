"use strict";

var util = require('./util');
var Promise = require('./promise');

var result = function() {
    return {
        uploadResult: {},
        imageResult: {}
    };
};

var chooseImage = function() {
    
};

var uploadFile = function(options) {

    var defaultOptions = {
        url: '',
        filePath: '',
        name: '',
        header: {},
        formData: {}
    };

    options = util.extend({}, defaultOptions, options);

    if(options.url == '') {
        throw new Error('请正确配置上传接口地址');
    }

    return function(options) {
        return new Promise(function(resolve, reject) {
            options.success = function(res) {
                let fileData;
                try {
                    fileData = JSON.parse(res.data);
                } catch (e) {
                    reject(e);
                }
                if (fileData) {
                    resolve(fileData);
                } else {
                    reject(fileData);
                }
            };
            options.fail = function(res) {
                reject(res);
            };
            wx.uploadFile(options);
        });
    };
    
}

module.exports = uploadFile;