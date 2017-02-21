var validate = {
    rules: {
        phone: /^1(3|4|5|8)\d{9}$/,  // 手机号
        password: /^\w{6,20}$/,   // 密码 (字母数字下划线6-20)
        unsigned_int : /^[0-9]*[1-9][0-9]*$/,        // 正整数
    },
    isPhone: function(phone) {
        return new RegExp(this.rules.phone).test(phone);
    },
    isPassword: function(password) {
        return new RegExp(this.rules.password).test(password);
    },
    isUnsignedInt: function(num) {
        return new RegExp(this.rules.unsigned_int).test(num);
    }
};

module.exports = validate;