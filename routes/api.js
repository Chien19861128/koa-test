var views = require('co-views');
var parse = require('co-body');

var books = require('../models/books');
//var required_models = ['books'];
//var loaded_models = models.connect(required_models).next().value;

//Specifying Swig view engine
var render= views(__dirname + '/../views', { map: { html: 'swig' }});
//var render= views('../views', { map: { html: 'swig' }});

exports.list = function *list(app) {
    var res = yield books.find({});
    //app.body = res;
    app.body = yield render('list', { books: res });
}

exports.show = function *show(app) {
    title = decodeURI(app.params.title);
    var res = yield books.find({title: title});
    app.body = res;
}

exports.create = function *create(app) {

    var write_value = yield parse(app);

    var validate = books.validate(write_value).next().value;

    console.log('[validate] '+validate);

    if (true === validate) {
        app.body = yield books.insert(write_value);
    } else {
        app.body = validate;
    }
}

exports.update = function *update(app) {
    title = decodeURI(app.params.title);

    var write_value = yield parse(app);

    var validate = books.validate(write_value).next().value;

    if (true === validate) {
        app.body = yield books.findAndModify(
          {query: {title: title}, update: write_value});
    } else {
        app.body = validate;
    }
}

exports.del = function *del(app) {
    title = decodeURI(app.params.title);
    var res = yield books.remove({title: title});
    app.body = res;
}
