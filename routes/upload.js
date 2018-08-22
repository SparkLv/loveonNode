var up = require("../common/upload");
var formidable = require("formidable");
var util = require("./util");

module.exports = {
    upload: function (req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            up.upload(files.file.path, files.file.name, res);
        });
    }
};
