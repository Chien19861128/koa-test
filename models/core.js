exports.validate = function *validate(write_value, schema) {

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
