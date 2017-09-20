var config = require('../config');

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 扩展对象
function extend(target) {
  var sources = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < sources.length; i += 1) {
    var source = sources[i];
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

// 是否是空对象
function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}


/*
日期时间格式化
format: yyyy(4位年), MM(2位月), dd(日期), hh(小时), mm(分钟), ss(秒)
yyyy-MM-dd hh:mm:ss => 2017-03-01 22:10:56
*/
function formatDate(format, timestamp) {

  var d;

  if (timestamp != undefined) {
    // 判断是否秒数时间戳
    if (timestamp.toString().length == 10) {
      timestamp = parseInt(timestamp) * 1000;
    }
    d = new Date(timestamp);
  } else {
    d = new Date();
  }

  var date = {
    "M+": d.getMonth() + 1,
    "d+": d.getDate(),
    "h+": d.getHours(),
    "m+": d.getMinutes(),
    "s+": d.getSeconds(),
    "q+": Math.floor((d.getMonth() + 3) / 3),
    "S+": d.getMilliseconds()
  };

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

// 判断数组是否有重复元素
function isRepeatArr(arr) {
  var arrStr = JSON.stringify(arr), str;
  for (var i = 0; i < arr.length; i++) {
    if ((arrStr.match(new RegExp(arr[i], "g")).length) > 1) {
      return true;
    }
  };
  return false;
}

// 校验手机格式
function checkMobile(mobile) {
  return new RegExp(/^1(3|4|5|8)\d{9}$/).test(mobile);
}

// 生成请求参数串 返回a=1&b=2&c=3... 或者null
function buildQueryParams(jsonParams) {
  if (isEmptyObject(jsonParams)) {
    return null;
  }
  var tmp = [];
  for (var i in jsonParams) {
    tmp.push(i + '=' + jsonParams[i]);
  }
  return tmp.join('&');
}

// 解析url请求参数 返回对象 或者null
function parseQueryParams(urlStr) {
  var paramsObj = {};
  if(typeof urlStr != 'string') {
    return null;
  }
  if(urlStr.indexOf('?') == -1) {
    return null;
  }
  urlStr.substr(1).replace(/(\w+)=(\w+)/ig, function(a, b, c){
    paramsObj[b] = unescape(c);
  });
  return paramsObj;
}

// 统计数组中每个值出现的次数, 返回对象以原数组的值为key, 出现次数为value
// 注意: 对返回结果取值时不能使用点语法, 而需使用result[key]的方式
function arrCountValues(arr) {
  if (arr.length == 0) {
    return {};
  }
  var result = {};
  for (var i = 0; i < arr.length; i++) {
    var tmp = arr[i];
    var count = 0;
    for (var j = 0; j < arr.length; j++) {
      if (tmp == arr[j]) {
        count++;
      }
    }
    result[tmp] = count;
  }
  return result;
}

// 检查数组中是否包含某个值 成功返回 [true|false]
function inArray(element, array) {
  try {
      var b = false;
      for (var i=0; i<array.length; i++) {
          if (array[i].toString()==element.toString()) {
              b = true;
              break;
          }
      }
      return b;
  } catch(err) {
      console.log("fun catch: ")
      console.log(err)
      return element
  }
}

// 格式化经纬度
function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }
  longitude = longitude.toFixed(6)
  latitude = latitude.toFixed(6)
  return {
    longitude: longitude,
    latitude: latitude,
  }
}

// 生成动态KEY
function createDynamicKey() {
  var uuidv4 = require('../vendor/uuid/we-uuidv4');
  return uuidv4().replace(/-/g, '');
}

// RSA 加密
function rsaEncrypt(plaintext) {
  var rsa = require('../vendor/encryption/rsa/rsa');
  rsa.setMaxDigits(130);
  var key = new rsa.RSAKeyPair("10001", '', config.publicKey);
  var encrypted = rsa.encryptedString(key, plaintext)
  // console.log("encrypted: ", encrypted)
  return encrypted
}

// AES 解密
function aesDecrypt(ciphertext, dynamic_key) {
  var CryptoJS = require('../vendor/encryption/aes/crypto-js');
  var key = CryptoJS.enc.Utf8.parse(dynamic_key);
  var iv = CryptoJS.enc.Utf8.parse(config.ivKey);
  // 解密
  var decrypted = CryptoJS.AES.decrypt(
      ciphertext,
      key,
      {iv:iv, mode:CryptoJS.mode.CBC, padding:CryptoJS.pad.Pkcs7}
  );
  return decrypted.toString(CryptoJS.enc.Utf8);// 一定要utf8转码
}

// AES 加密
function aesEncrypt(plaintext, dynamic_key) {
  var CryptoJS = require('../vendor/encryption/aes/crypto-js');
  var key = CryptoJS.enc.Utf8.parse(dynamic_key);
  var iv = CryptoJS.enc.Utf8.parse(config.ivKey);
  // 解密
  var encrypted = CryptoJS.AES.encrypt(
      plaintext,
      key,
      {iv:iv, mode:CryptoJS.mode.CBC, padding:CryptoJS.pad.Pkcs7}
  );
  return encrypted.toString();
}

module.exports = {
  extend: extend,
  formatTime: formatTime,
  isEmptyObject: isEmptyObject,
  formatDate: formatDate,
  isRepeatArr: isRepeatArr,
  checkMobile: checkMobile,
  buildQueryParams: buildQueryParams,
  parseQueryParams: parseQueryParams,
  arrCountValues: arrCountValues,
  inArray: inArray,
  formatLocation: formatLocation,
  createDynamicKey: createDynamicKey,
  rsaEncrypt: rsaEncrypt,
  aesDecrypt: aesDecrypt,
  aesEncrypt: aesEncrypt
}
