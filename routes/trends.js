const sql = require("../database/sql/trends.js");
const con = require("../database/index.js");
const util = require("./util");

module.exports = {
    getInit: function (req, res) {
        con(sql.getById, [req.params.id, req.params.pid, 0, 0, 15], function (result) {
            res.send(util.resData('1', result, '成功'));
        }, function (err) { util.resData('0', result, '获取失败') })
    },
    getUpate: function (req, res) {
        con(sql.getById, [req.body.id, req.body.pid, req.body.lid, req.body.lid, 20], function (result) {
            res.send(util.resData('1', result, '成功'));
        }, function (err) { util.resData('0', result, '获取失败') })
    },
    add: function (req, res) {
        con(sql.add, [req.body.text || null, req.body.img || null, req.body.sid, req.body.pid, req.body.loc || null], function (result) {
            res.send(util.resData('1', '', '发布成功'));
        }, function (err) { util.resData('0', err, '发布失败') })
    },
    del: function (req, res) {
        con(sql.add, [req.params.id], function (result) {
            res.send(util.resData('1', '', '删除成功'));
        }, function (err) { util.resData('0', err, '删除失败') })
    }
};