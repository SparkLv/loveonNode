var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sql = require('../database/sql/chat');
const con = require("../database/index.js");
const util = require("./util");

module.exports = {
    init() {
        io.on('connection', (socket) => {
            const idsArr = socket.request.url.split('?')[1].split('&');
            const id1 = idsArr[0].split('=')[1];
            const id2 = idsArr[1].split('=')[1];
            const room = parseInt(id1, 10) > parseInt(id2, 10) ? (id2 + '&' + id1) : (id1 + '&' + id2);
            socket.join(room, () => {
                con(sql.getChatById, [id1, id2, 0, 0, 20], function (result) {
                    io.to(room).emit('message', result);
                }, function (err) { util.res400(err, res) })
            });
            socket.on('getHistory', (obj) => {
                con(sql.getChatById, [id1, id2, obj.finId, obj.finId, 20], function (result) {
                    io.to(room).emit('sendHistory', result);
                }, function (err) { util.res400(err, res) })
            })
            socket.on('send', (obj) => {
                con(sql.setChat, [obj.text, id1, room], function (result) {
                    io.to(room).emit('sendResult', util.resData(1, '', '发送成功'));
                }, function (err) { console.log(err); io.to(room).emit('sendResult', util.resData(0, err, '发送失败')); })
            })
        });

        http.listen(2422);
    }
}