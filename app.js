var logger = require('koa-logger');
var views = require('co-views');
var parse = require('co-body');
var koa = require('koa');
var route = require('koa-route');
var app = module.exports = koa();
//var monk = require('monk');
//var wrap = require('co-monk');
var thunkify = require('thunkify');
var mongoose = require('mongoose');
mongoose.connect = thunkify(mongoose.connect);
mongoose.connection = thunkify(mongoose.connection);
mongoose.Schema = thunkify(mongoose.Schema);
mongoose.model = thunkify(mongoose.model);
mongoose.model.find = thunkify(mongoose.model.find);
mongoose.model.save = thunkify(mongoose.model.save);
var api = require('./routes/api');

var db = mongoose.connection;

var vcardSchema = new mongoose.Schema({
    name: String,
    nickname: String,
    tel: String
})

app.db = {
    model: mongoose.model('user', vcardSchema)
};

app.use(logger());

app.use(route.get('/book', api.list));
app.use(route.get('/book/:title', api.show));

app.get('/book/:title', function(req, res) {
  title = decodeURI(req.params.title);
  book.find({title: title}, function(error, book) {
    res.send(book);
  });
});

if (!module.parent) app.listen(3333);
