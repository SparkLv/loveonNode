module.exports = function (sql, param, fun1, fun2) {
  const mysql = require("mysql");
  let connect = null;
  connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Za123123!",
    port: "3306",
    database: "loveon",
    charset:'utf8mb4'
  });


  connect.connect(function (err) {
    if (err) {
      res.send("数据库链接错误");
    } else {
      connect.query(sql, param, function (err, result) {
        if (err) {
          fun2(err);
        } else {
          fun1(result);
          connect.end();
        }
      });
    }
  });
};
