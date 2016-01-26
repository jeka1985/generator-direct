'use strict';

var path = require('path'),
    common = require('../../common'),
    dataBuilder = require('./data');

module.exports = {

    tplExtension: '.txt',

    techExtension: {
        js: '.js',
        md: '.md',
        vm: '.vm.js',
        css: '.css',
        test: '.test.js',
        deps: '.deps.js',
        utils: '.utils.js',
        bemhtml: '.bemhtml',
        bemtree: '.bemtree'
    },

    getTpl: function(tech) {
        return path.join(tech + this.tplExtension);
    },

    getPath: function(tech, params) {

        return path.join(this.getBemFolder(params),  common.getBemName(params) + this.techExtension[tech]);
    },

    getBemFolder: function(params) {
        var elemStr = params.elemName ? '__' + params.elemName : '',
            modStr = params.modName ? '_' + params.modName : '';

        return path.join(params.blockName, elemStr, modStr);
    },

    getData: function(tech, params) {

        return dataBuilder[tech] ? dataBuilder[tech](params) : params;
    }
};
