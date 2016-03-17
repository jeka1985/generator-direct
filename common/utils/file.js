'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    path = require('path');

module.exports = {
    /**
     * Возвращает список существующих фалов из массива files
     * @param {Array} files - массив файлов
     * @returns {Array}
     */
    getExisting: function(files) {
        var isExist = function(path) {
            try {
                return fs.statSync(path).isFile();
            }
            catch (err) {
                return false;
            }
        };

        return files.filter(isExist);
    },

    /**
     * Удаляет файлы и пустые папки
     * @param {Array} files - массив файлов
     */
    remove: function(files) {
        _.forEach(files, function(file) {
            fs.unlink(file, function() {
                var folders = path.dirname(file).split('/');

                while (folders.length > 1) {
                    try {
                        fs.rmdirSync(path.join(folders.join('/')));

                        folders.pop();

                    } catch (e) { return }
                }
            });
        });
    }
};
