'use strict';

var u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    interactions: interactions.all(),

    fileExt: '.md',

    _getData: function(inputData) {

        return {
            name: u.bem.getName(inputData),
            author: process.env['USER'],
            data: inputData
        };
    }

});

