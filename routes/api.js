/*var monk = require('monk')
, wrap = require('co-monk')
, db = monk('localhost/starwars')
, books = wrap(db.get('books'));*/

exports.list = function *list() {
  var res = yield this.request.app.db.model.find({});
  this.body = res;
}

exports.show = function *show(title) {
  title = decodeURI(title);
  var res = yield this.request.app.db.model.find({title: title});
  this.body = res;
}
