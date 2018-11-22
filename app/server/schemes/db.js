var mongoose = require("mongoose"); 
var config = require('../config');

exports.connect = (function () {
    var _isConnected = false; // 是否已连接数据库

    return function (fun) {
        if (!fun) {
            console.log('[scheme error]: connet require fun');
            return;
        }

        if (_isConnected) {
            fun();
        } else {
            mongoose.connect(config.DB_URL, { useNewUrlParser: true }, (err) => {
                if (err) {
                    console.log('[scheme error]: connet error', err);
                    fun(err)
                } else {
                    _isConnected = true;
                    fun();
                }
            });
        }
    }
})()


exports.response = function (err, res, cb) {
    if (err) {
        cb({
            error: -1,
            data: err,
        })
    } else {
        cb({
            error: 0,
            data: res
        })
    }
}