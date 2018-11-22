/**
 * 服务单 -- 路由层
 */
var dao = require('../schemes/service');

var routers = [
    {
        type: 'get',
        path: '/api/service/find',
        func: function (req, res) {
            dao.findAll(req, function (result) {
                res.json(result);
            });
        }
    },
    {
        type: 'get',
        path: '/api/service/findOne',
        func: function (req, res) {
            dao.findOne(req, function (result) {
                res.json(result);
            });
        }
    },
    {
        type: 'post',
        path: '/api/service/add',
        func: function (req, res) {
            dao.add(req, function (result) {
                res.json(result);
            });
        }
    },
    {
        type: 'post',
        path: '/api/service/update',
        func: function (req, res) {
            dao.update(req, function (result) {
                res.json(result);
            });
        }
    },
    {
        type: 'post',
        path: '/api/service/delete',
        func: function (req, res) {
            dao.delete(req, function (result) {
                res.json(result);
            });
        }
    },
    {
        type: 'post',
        type: 'post',
        path: '/api/service/booking',
        func: function (req, res) {
            dao.booking(req, function (result) {
                res.json(result);
            });
        }
    }
];

module.exports = routers;