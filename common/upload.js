module.exports = {
    upload: function (path, name, res) {
        const qiniu = require("qiniu");

        var accessKey = "mnI2TGKTHZCqs8TLS95uBmBPMqIwt7K_UdysdfY0";
        var secretKey = "S9iG4HCWj79ClKENPKL7kboW0FZ14fuQVONPcS2T";
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

        var options = {
            scope: "loveon"
        };

        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);

        var config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z0;

        var localFile = path;
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();
        var key = name;

        formUploader.putFile(uploadToken, key, localFile, putExtra, function (
            respErr,
            respBody,
            respInfo
        ) {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                res.send({
                    code:'1',
                    data:'',
                    message:'上传成功'
                });
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        });
    }
};
