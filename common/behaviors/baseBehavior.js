'use strict';

var u = require('../utils'),
    path = require('path'),
    _ = require('lodash');

module.exports = {

    initializing: function() {
        this.props = u.generator.parseProps(this.settings.props, this);
    },

    prompting: function() {
        this._prompt(this._getStartPrompt.call(this));
    },

    configuring: function() {
        u.generator.formatProps(this.settings.props, this.props);
    },

    writing: function() {
        var root = './desktop.blocks';

        u.generator.cartesianProps(this.props, this.settings.props)
            .map(function(data) {
                this.fs.copyTpl(
                    this.templatePath(this.tmpFileName || 'index.txt'),
                    this.destinationPath(path.join(root, u.bem.getPath(data)) + _.result(this, 'fileExt')),
                    this._getData(_.extend(this.props, data)));

            }, this);
    }
};

