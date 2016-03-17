'use strict';

var _ = require('lodash');

module.exports = {
    file: require('./file'),
    bem: require('./bem'),
    generator: require('./generator'),

    resultWith: function(ctx, field, args) {
        var ctxFiled = ctx[field];

        return _.isFunction(ctxFiled) ? ctxFiled.apply(ctx, args) : ctxFiled;
    }
};
