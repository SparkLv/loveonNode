const util = require("./util");
const fs = require('fs');
const path = require('path');

module.exports = {
    getMovie: function (req, res) {
        fs.readFile(path.join(__dirname, '../data/movie.json'), function (err, data) {
            if (err) {
                res.send(util.resData('0', '', '获取失败'));
            } else {
                res.send(util.resData('1', JSON.parse(data.toString()), '成功'));
            }
        });
    }
};