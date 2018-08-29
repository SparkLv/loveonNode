module.exports = {
    getById: 'SELECT * FROM trends where sid in (?, ?) and (0=? or id<?) order by id desc limit ?',
    add: "INSERT INTO trends(text,img,sid,pid,loc) VALUES(?,?,?,?,?)",
    del: "DELETE FROM trends where id = ?"
};  