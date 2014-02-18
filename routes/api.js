var views = require('co-views');
var parse = require('co-body');

var models = require('../models/');
var required_models = ['books'];
var loaded_models = models.connect(required_models).next().value;


exports.list = function *list(app) {
    var res = yield loaded_models.books.find({});
    app.body = res;
}

exports.show = function *show(app) {
    title = decodeURI(app.params.title);
    var res = yield loaded_models.books.find({title: title});
    app.body = res;
}

exports.create = function *create(app) {

    var write_value = yield parse(app);

    var validate = loaded_models.books.validate(write_value).next().value;

    if (true === validate) {
        app.body = yield loaded_models.books.insert(write_value);
    } else {
        app.body = validate;
    }
}

exports.update = function *update(app) {
    title = decodeURI(app.params.title);

    var write_value = yield parse(app);

    var validate = loaded_models.books.validate(write_value).next().value;

    if (true === validate) {
        app.body = yield loaded_models.books.findAndModify(
          {query: {title: title}, update: write_value});
    } else {
        app.body = validate;
    }
}

exports.del = function *del(app) {
    title = decodeURI(app.params.title);
    var res = yield loaded_models.books.remove({title: title});
    app.body = res;
}
