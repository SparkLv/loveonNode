const sql = require("../database/sql/user.js");
const con = require("../database/index.js");
const util = require("./util");

function connect(req, res, partner) {
    con(sql.conPartner, [partner.id, req.body.id], function (result) {
        con(sql.conPartner, [req.body.id, partner.id], function (result2) {
            res.send(util.resData('1', null, '配对成功'));
        })
    }, function (err) { util.res400(err, res) })
}

module.exports = {
    login: function (req, res) {
        con(sql.login, [req.body.username], function (result) {
            if (result.length) {
                if (req.body.password == result[0].password) {
                    con(sql.setPushId, [req.body.pushId, result[0].id], function () {
                        res.send(util.resData('1', result[0], '登陆成功'))
                    }, function () {
                        res.send(util.resData('0', null, '未知错误'))
                    })
                } else {
                    res.send(util.resData('0', null, '用户名或密码错误'))
                }
            } else {
                res.send(util.resData('0', null, '用户不存在'))
            }
        }, function (err) { util.res400(err, res) });
    },
    register: function (req, res) {
        const param = [req.body.username, req.body.password, req.body.sex, req.body.name, req.body.headImg, util.getRandom(6)];
        con(sql.login, [req.body.username], function (result0) {
            if (result0.length) {
                res.send(util.resData('2', null, '邮箱已存在'));
            } else {
                con(sql.register, param, function (result) {
                    res.send(util.resData('1', null, '注册成功'))
                }, function (err) { util.res400(err, res) });
            }
        }, function (err) { util.res400(err, res) })
    },
    getInfoById: function (req, res) {
        con(sql.getById, [req.params.id], function (result) {
            res.send(util.resData(1, result[0], ''));
        }, function (err) { util.res400(err, res) })
    },
    conPart: function (req, res) {
        con(sql.validCode, [req.body.code], function (result) {
            if (result.length) {
                if (result[0].pid) {
                    res.send(util.resData('2', null, '改密钥用户已配对'))
                }
                else {
                    if (result[0].id == req.body.id) {
                        res.send(util.resData('3', null, '不能和自己配对哈'))
                    }
                    else {
                        connect(req, res, result[0])
                    }
                }
            }
            else {
                res.send(util.resData('0', null, '密钥不存在'))
            }
        }, function (err) { util.res400(err, res) })
    }
};