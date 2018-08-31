const loveonUser = require('./user');
const loveonUpload = require('./upload');
const loveonTrends = require('./trends');
const getData = require('./getData');

module.exports = function (app) {
  app.route('/loveon/user/login').post(loveonUser.login);
  app.route('/loveon/user/register').post(loveonUser.register);
  app.route('/loveon/user/getById/:id').get(loveonUser.getInfoById);
  app.route('/loveon/user/connect').post(loveonUser.conPart);
  app.route('/loveon/upload').post(loveonUpload.upload);
  app.route('/loveon/getInit/:id/:pid').get(loveonTrends.getInit);
  app.route('/loveon/getUpdate').post(loveonTrends.getUpate);
  app.route('/loveon/add').post(loveonTrends.add);
  app.route('/loveon/del/:id').delete(loveonTrends.del);
  app.route('/loveon/get/movie').get(getData.getMovie);
};