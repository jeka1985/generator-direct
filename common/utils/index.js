'use strict';
var path = path = require('path');

module.exports = {

    getBemTplDecl: function(name, opts) {
        var data = { block: name };

        if(opts.elem) data.elem = opts.elem;
        if(opts.modName && opts.modVal) data.mod = [opts.modName, opts.modVal].join(' ');

        return Object.keys(data).map(function(key) {
            return [key, data[key]].join(' ');
        }).join(', ');
    },

    getBemName: function(block, elem, mod, modVal) {
        var elemStr = elem ? '__' + elem : '',
            modStr = mod && modVal ? '_' + mod + '_' + modVal : '';

        return [block, elemStr, modStr].join('');
    },

    getBemFolder: function(block, elem, mod) {
        var elemStr = elem ? '__' + elem : '',
            modStr = mod ? '_' + mod : '';

        return path.join(block, elemStr, modStr);
    }
};
