/*
 * 服务单 -- 数据操作层
 */

var mongoose = require("mongoose"); 
var db = require('./db.js');
var Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    // 项目名
    name: { type: String },
    // 联系电话
    phone: { type: String },
    // 开始时间
    startTime: { type: Date },
    // 结束时间
    endTime: { type: Date },
    // 地址
    address: { type: String },
    // 介绍
    introduce: {
        type: String
    },
    // 预约登记者
    bookers: [ 
        { 
            user: { type: Schema.Types.ObjectId, ref: 'account' }, // 预约用户
            phone: { type: String }, // 预约用户联系方式
            name: { type: String }, // 预约用户姓名
        }
    ],
    // 预约登记者上限
    bookersLimit: { type: Number, default: 1000 },
    // 创建时间
    createTime: { type: Date, default: new Date() },
    // 创建者
    createUser: { type: Schema.Types.ObjectId, ref: 'account' },
});

const Service = mongoose.model('services', ServiceSchema);

/** 
 * 查询全部
 */
exports.findAll = function (req, callback) {
    db.connect(function (err) {
        if (!err) {
            // var page = 0; // 页码
            // var limit = 10; // 页数据量

            Service.find({})
                // .skip(page * limit)
                // .limit(limit)
                .sort({'_id': -1}) // 排序
                .exec(function (err, res) {
                    db.response(err, res, callback);
                })
        }
    })
}

/**
 * 查询单个
 */
exports.findOne = function (req, callback) {
    db.connect(function (err) {
        if (!err) {
            Service.findOne({ '_id': req.query._id })
                .exec(function (err, res) {
                    db.response(err, res, callback);
                })
        }
    })
}

/**
 * 新增单个
 */
exports.add = function (req, callback) {
    db.connect(function (err) {
        if (!err) {
            var newService = new Service(req.body)

            newService.save(function (err, res) {
                db.response(err, res, callback);
            })
        }
    })
}

/**
 * 更新
 */
exports.update = function (req, callback) {
    db.connect(function (err) {
        if (!err) {
            var _id = req.body._id

            Service.findOneAndUpdate({
                _id: _id
            }, req.body, function (err, res) {
                db.response(err, res, callback);
            })
        }
    })
}

/**
 * 预约
 */
exports.booking = function (req, callback) {
    db.connect(function (err) {
        if (!err) {
            var _id = req.body._id

            if (req.session.user === null || !req.session.user) {
                callback({
                    error: 3,
                    data: {
                        message: '请先登录'
                    }
                })
            }

            // 服务查询
            Service.findOne({ '_id': _id })
                .exec(function (err, resData) {
                    if (!err && resData) {
                        var bookers = resData.bookers;
                        var bookersLimit = resData.bookersLimit;

                        if (bookers.length < bookersLimit) {
                            bookers.push(req.session.user._id)

                            // 预约
                            Service.findOneAndUpdate({
                                _id: _id
                            }, {
                                bookers: bookers
                            }, function (err2, res2) {
                                db.response(err2, res2, callback);
                            })
                        } else {
                            callback({
                                error: 2,
                                data: {
                                    message: '预约人数超过上限'
                                }
                            })
                        }
                    } else {
                        callback({
                            error: 1,
                            data: {
                                message: '预约单不存在'
                            }
                        })
                    }
                })
        }
    })
}

/**
 * 删除
 */
exports.delete = function (req, callback) {
    db.connect(function (err) {
        if (!err) {
            Service.deleteOne({
                _id: req.body._id
            }, function (err, res) {
                db.response(err, res, callback);
            })
        }
    })
}