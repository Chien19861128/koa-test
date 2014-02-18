var logger = require('koa-logger');
var koa = require('koa');
var router = require('koa-router');
var app = module.exports = koa();

app.use(logger());
app.use(router(app));

app.get('/book', function *() {
    var api = require('./routes/api');
    yield api.list(this);
});

app.get('/book/:title', function *() {
    var api = require('./routes/api');
    yield api.show(this);
});

app.post('/book', function *() {
    var api = require('./routes/api');
    yield api.create(this);
});

app.put('/book/:title', function *() {
    var api = require('./routes/api');
    yield api.update(this);
});

/*app.del('/book/:title', function *() {
    var api = require('./routes/api');
    yield api.del(this);
});*/

if (!module.parent) app.listen(3300);
