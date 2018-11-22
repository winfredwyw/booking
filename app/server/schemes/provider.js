/**
 * 服务商 -- 数据操作层
 */


var mongoose = require("mongoose"); 
var db = require('./db.js');
var Schema = mongoose.Schema;

const ProviderSchema = new Schema({
    // 服务商名称
    name: { type: String },
    // 服务商联系电话
    phone: { type: String },
    // 服务商地址
    address: { type: String },
    // 服务商介绍
    introduce: {
        type: String
    },
    // 创建时间
    createTime: { type: Date, default: new Date() },
    // 创建者
    createUser: { type: Schema.Types.ObjectId, ref: 'account' },
});

const Provider = mongoose.model('providers', ProviderSchema);
