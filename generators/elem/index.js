'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.argument('blockName', { type: String, required: true });
        this.argument('elemName', { type: String, required: true });
    },

    writing: function () {

    }
});
