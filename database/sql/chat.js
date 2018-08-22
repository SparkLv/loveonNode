module.exports = {
    getChatById: 'SELECT * FROM chat where sid in (?, ?) and (0=? or id<?) order by id desc limit ?',
    setChat: "INSERT INTO chat(text,sid,room) VALUES(?,?,?)"
    // getById: "SELECT * FROM user where id=?",
    // validCode: "SELECT * FROM user where code = ?",
    // conPartner: 'UPDATE user SET pid = ? WHERE id = ?'
};  