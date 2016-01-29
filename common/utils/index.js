'use strict';
var path = path = require('path');

module.exports = {

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
