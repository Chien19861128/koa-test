exports.schema = function *schema() {
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

    yield schema;
}

exports.index = function *index() {
    var index = [
        {
            key: 'era'
        },
        {
            key: 'title',
            options: { unique: true }
        }
    ];

    yield index;
}
