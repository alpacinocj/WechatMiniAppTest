var config = require('../../../config');
var upload = require('../../../utils/upload');
var request = require('../../../utils/request');
var tooltip = require('../../../utils/tooltip');
var messages = require('../../../utils/messages');

var app = getApp();

Page({
    data: {
        pageTitle: '',
        checkedImg: '../../../icons/plus.png',
        ocrResult: false,
        cardTypes: [
            {
                name: 'idcard',
                title: '个人身份证',
                checked: true
            },
            {
                name: 'driving_license',
                title: '驾驶证',
                checked: false
            },
            {
                name: 'vehicle_license',
                title: '机动车行驶证',
                checked: false
            },
            {
                name: 'business_license',
                title: '营业执照',
                checked: false
            },
            {
                name: 'operation_certific',
                title: '车辆营运证',
                checked: false
            },
            {
                name: 'taxpayer_certific',
                title: '一般纳税人认定书',
                checked: false
            }
        ],
        checkedType: '',
        imageList: [],
        showCanvas: false
    },
    onLoad: function (options) {
        console.log(options);
        this.setData({
            pageTitle: options.page_title
        });
        for (var i in this.data.cardTypes) {
            if (this.data.cardTypes[i]['checked']) {
                this.setData({
                    checkedType: this.data.cardTypes[i]['name']
                });
                break;
            }
        }
    },
    radioChange: function (e) {
        console.log(e);
        this.setData({
            checkedType: e.detail.value
        });
    },
    uploadImg: function (e) {
        var self = this;
        upload.uploadSingle({
            success: function (res) {
                console.log(res);
                self.setData({
                    checkedImg: res.message
                });
                setTimeout(function() {
                    tooltip.showBusy(messages.file_is_identifying);
                    self.cardOcr(res.message);
                }, 300);
            },
            fail: function (error) {
                console.log(error);
            }
        });
    },
    cardOcr: function (imgFile) {
        var self = this;
        var queryData = {
            identify_type: this.data.checkedType,
            certificate_file: imgFile
        };
        request()
            .post(config.api.cardOcr.url)
            .query(queryData)
            .end()
            .then(
                function(res) {
                    console.log(res);
                    if(res.status == 200) {
                        if(typeof res.data == 'string') {
                            res.data = JSON.parse(res.data);
                        }
                        self.setData({
                            ocrResult: self.parseOcrResult(res.data.cards[0])
                        });
                    } else {
                        tooltip.showError(res.message);
                    }
                },
                function(error) {
                    console.log(error);
                }
            ).then(function() {
                tooltip.hide();
            });
    },
    clearData: function() {
        this.setData({
            ocrResult: false,
            checkedImg: '../../../icons/plus.png'
        });
    },
    parseOcrResult: function(resultObj) {
        if(typeof resultObj != 'object') {
            return false;
        }
        var result = [];
        for(var k in resultObj) {
            if(typeof resultObj[k] != 'string') {
                continue;
            }
            result.push({
                key: k,
                value: resultObj[k]
            });
        }
        return result;
    },
    chooseImage: function() {
        var self = this;
        wx.chooseImage({
          count: 1, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res){
            // success
            console.log(res);
            var tempPath = res.tempFilePaths[0];
            self.setData({
                checkedImg: tempPath
            });
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })
    },
    convertImgToBase64: function(url, canvasId, callback) {
        var canvasCtx = wx.createCanvasContext(canvasId);
        var image = new Image();
        image.crossOrigin = 'Anonymous';
        image.onload = function() {

        };
        image.src = url;
    }
});