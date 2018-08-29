module.exports = {
    login: 'SELECT * FROM user where username = ?',
    register: "INSERT INTO user(username,password,sex,name,headImg,code) VALUES(?,?,?,?,?,?)",
    getById: "SELECT * FROM user where id=?",
    validCode: "SELECT * FROM user where code = ?",
    conPartner: 'UPDATE user SET pid = ? WHERE id = ?',
    setPushId: 'UPDATE user SET pushId = ? WHERE id = ?'
};  