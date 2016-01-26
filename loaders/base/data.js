'use strict';

var common = require('../../common');

module.exports = {

    js: function(input) {
        var params = ['blockName', 'modName', 'modVal', 'baseBlock'].reduce(function(data, key) {

            if (input[key]) data[key] = input[key];

            return data;
        }, {});

        return {
            declaration: Object.keys(params).map(function(key) {
                return [key, "'" + params[key] + "'"].join(': ');
            }).join(', ')
        };
    },

    css: function(input) {
       return {
           declaration: common.getBemName(input)
       }
    },

    bemhtml: function(input) {
        var data = { block: input.blockName };

        if(input.modName && input.modVal) data.mod = [input.modName, input.modVal].join(' ');

        return {
            declaration: Object.keys(data).map(function(key) {
                return [key, data[key]].join(' ');
            }).join(', ')
        };
    },

    bemtree: function(input) {

        var data = { block: input.blockName };

        if(input.modName && input.modVal) data.mod = [input.modName, input.modVal].join(' ');

        return {
            declaration: Object.keys(data).map(function(key) {
                return [key, data[key]].join(' ');
            }).join(', ')
        };
    },

    md: function(input) {
        return {
            name: common.getBemName(input),
            author: process.env['USER']
        }
    },

    deps: function(input) {
        var mustDeps = [],
            shouldDeps = [];

        input.techList.indexOf('js') >= 0 && shouldDeps.push('i-subscription-manager');
        input.baseBlock && mustDeps.push(input.baseBlock);
        input.baseModel && mustDeps.push(input.baseModel);

        return {
            mustDeps: mustDeps,
            shouldDeps: shouldDeps
        }
    },

    test: function(input) {
       return {
           declaration: common.getBemName(input)
       }
    },

    utils: function(input) {
       return {
           declaration: common.getBemName(input)
       }
    },

    vm: function(input) {
        var data = {
            model: common.getBemName(input)
        };

        if(input.baseModel) data.baseModel = input.baseModel;

        return {
            declaration : Object.keys(data).map(function(key) {
                return [key, "'" + data[key] + "'"].join(': ');
            }).join(', ')
        };
    }
};
