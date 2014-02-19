var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/starwars');
var books = wrap(db.get('books'));
var core = require('./core');

var schema = {
    mandatory: {
        era: 'string',
        title: 'string'
    },
    optional: {
        author: 'string',
        type: 'string'
    }
};

var index = [
    {
        key: 'era'
    },
    {
        key: 'title',
        options: { unique: true }
    }
];

books.schema = function *schema() {

    yield schema;
}

books.index = function *index() {

    yield index;
}

books.validate = function *validate(write_value) {    
    yield core.validate(write_value, schema).next().value;
}

module.exports = books;
