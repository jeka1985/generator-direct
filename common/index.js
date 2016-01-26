'use strict';

module.exports = {

    getBemName: function(params) {
        var elemStr = params.elemName ? '__' + params.elemName : '',
            modStr = params.modName && params.modVal ? '_' + params.modName + '_' + params.modVal : '';

        return [params.blockName, elemStr, modStr].join('');
    }
};
