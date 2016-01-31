'use strict';
var path = require('path'),
    _ = require('lodash');

module.exports = {

    /**
     * Нормализует строку в БЕМ нотацию
     * @param {String} str - исходная строка
     * @returns {String}
     */
    normalizeName: function(str) {

        return _.kebabCase(str);
    },

    /**
     * Формирует строку для декларации шаблона
     * @param {String} name - имя блока
     * @param {Object} otps - данные декларации
     * @returns {String}
     */
    getBemTplDecl: function(name, opts) {
        var data = { block: name };

        if(opts.elem) data.elem = opts.elem;
        if(opts.modName && opts.modVal) data[opts.elem ? 'elemMod' : 'mod'] = [opts.modName, opts.modVal];

        return this._getDeclString(data, false, ' ');
    },

    /**
     * Формирует строку для JS декларации (js, model)
     * @param {Object} decl - данные декларации
     * @returns {String}
     */
    getJsDeclaration: function(decl) {

        return this._getDeclString(decl, true, ': ');
    },

    /**
     * Возвращает имя файла в БЭМ нотации по заданым параметрам
     * @param {String} block - имя блока
     * @param {String} elem - имя элемента
     * @param {String} mod - имя модификатора
     * @param {String} modVal - значение модификатора
     * @returns {String}
     */
    getBemName: function(block, elem, mod, modVal) {

        return [
            this.normalizeName(block),
            this._getNameSubStr('__', elem),
            this._getNameSubStr('_', mod) + this._getNameSubStr('_', modVal)
        ].join('');
    },

    /**
     * Возвращает имя папки в БЭМ нотации по заданым параметрам
     * @param {String} block - имя блока
     * @param {String} elem - имя элемента
     * @param {String} mod - имя модификатора
     * @returns {String}
     */
    getBemFolder: function(block, elem, mod) {

        return path.join(
            this.normalizeName(block),
            this._getNameSubStr('__', elem),
            this._getNameSubStr('_', mod));
    },

    /**
     * Хелпер для создания подстрок с заданым разделителем
     * @param {String} delimiter - разделитель
     * @param {String} str - строка
     * @returns {String}
     * @private
     */
    _getNameSubStr: function(delimiter, str) {

        return str ? delimiter + this.normalizeName(str) : '';
    },

    /**
     * Хелпер для создания декларации
     * @param {Object} data - данные декларации
     * @param {Boolean} wrapInQuotes - оборачивать ли значение в скобки
     * @param {String} joiner - соединитель ключ - значение
     * @returns {String}
     * @private
     */
    _getDeclString: function(data, wrapInQuotes, joiner) {

        return Object.keys(data).map(function(key) {

            return [
                key,
                wrapInQuotes ?
                    "'" + data[key] + "'" :
                    data[key] instanceof Array ?
                        data[key].map(function(str) {
                            return this.normalizeName(str);
                        }, this).join(' ') :
                        data[key]
            ].join(joiner);
        }, this).join(', ');
    }
};
