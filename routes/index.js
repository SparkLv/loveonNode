const loveonUser = require('./user');
const loveonUpload = require('./upload');

module.exports = function (app) {
  app.route('/loveon/user/login').post(loveonUser.login);
  app.route('/loveon/user/register').post(loveonUser.register);
  app.route('/loveon/user/getById/:id').get(loveonUser.getInfoById);
  app.route('/loveon/user/connect').post(loveonUser.conPart);
  app.route('/loveon/upload').post(loveonUpload.upload);
};