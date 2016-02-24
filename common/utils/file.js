'use strict';

var fs = require('fs'),
    _ = require('lodash');

module.exports = {

    /**
     * Удаляет файлы
     * @param {Array} files - массив файлов
     * @returns {String}
     */
    remove: function(files) {
        _.forEach(files, function(file) {
            fs.unlinkSync(file);
        });
    }
};
