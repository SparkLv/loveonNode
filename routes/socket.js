var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sql = require('../database/sql/chat');
const con = require("../database/index.js");
const util = require("./util");
const moment = require('moment');

var JPush = require("jpush-async/lib/JPush/JPushAsync.js")
var client = JPush.buildClient('57cc23f659fcba47b56cca41', '2e6faba37316e1078a2e0bc4')

module.exports = {
    init() {
        io.on('connection', (socket) => {
            const idsArr = socket.request.url.split('?')[1].split('&');
            const id1 = idsArr[0].split('=')[1];
            const id2 = idsArr[1].split('=')[1];
            const room = parseInt(id1, 10) > parseInt(id2, 10) ? (id2 + '&' + id1) : (id1 + '&' + id2);
            socket.join(room, () => { });
            socket.on('initMessage', () => {
                con(sql.getChatById, [id1, id2, 0, 0, 15], function (result) {
                    result = result.map(item => {
                        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss');
                        return item
                    })
                    io.to(room).emit('message', { code: 1, id: id1, data: result });
                }, function (err) { util.res400(err, res) })
            })
            socket.on('getHistory', (obj) => {
                con(sql.getChatById, [id1, id2, obj.finId, obj.finId, 10], function (result) {
                    result = result.map(item => {
                        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss');
                        return item
                    })
                    io.to(room).emit('sendHistory', { id: obj.id, data: result });
                }, function (err) { util.res400(err, res) })
            })
            socket.on('send', (obj) => {
                con(sql.setChat, [obj.text, id1, room], function (result) {
                    io.to(room).emit('sendResult', util.resData(1, { id: 10000 * Math.random(), sid: id1, text: obj.text }, '发送成功'));
                    client.push().setPlatform(JPush.ALL)
                        .setAudience(JPush.registration_id(obj.pPushId))
                        .setNotification(JPush.android(obj.text, obj.pName, 1, {}))
                        .send()
                        .then(function (result) {
                            console.log(result)
                        }).catch(function (err) {
                            console.log(err)
                        })
                }, function (err) { console.log(err); io.to(room).emit('sendResult', util.resData(0, err, '发送失败')); })
            })
        });

        http.listen(2422);
    }
}