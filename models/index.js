var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/starwars');

exports.connect = function *connect(required_models) {

    var models = [];
    for (var i in required_models) {
        var model_object = wrap(db.get(required_models[i]));

        var model = require('./' + required_models[i]);
        var schema = model.schema().next().value;

        model_object.validate = function *validate(write_value) {

            for (var j in schema.mandatory) {
                if (!(j in write_value)) yield 'mandatory value missing: '+j;
                if (typeof write_value[j] !== schema.mandatory[j]) yield 'incorrect data type: '+j;
            }

            for (var j in schema.optional) {
                if (j in write_value &&
                  typeof write_value[j] !== schema.optional[j]) yield 'incorrect data type: '+j;
            }

            for (var j in write_value) {
                if (!(j in schema.mandatory) && !(j in schema.optional)) yield 'unrecognized field: '+j;
            }

            yield true;
        }

        var index = model.index().next().value;

        for (var j in index) {
            if (index[j].options !== 'undefined') model_object.index(index[j].key, index[j].options);
            else model_object.index(index[j].key);
        }

        models[required_models[i]] = model_object;
    }

    yield models;
}
