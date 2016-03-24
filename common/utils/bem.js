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
     * Возвращает путь (включая имя файла) в БЭМ нотации по заданым параметрам
     * @param {Object} data - параметрв
     * @param {String} data.blockName - имя блока
     * @param {String} data.elem - имя элемента
     * @param {String} data.mod - имя модификатора
     * @param {String} data.modVal - значение модификатора
     * @returns {String}
     */
    getPath: function(data) {

        return path.join(this.getFolder(data), this.getName(data));
    },

    /**
     * Формирует строку для декларации шаблона
     * @param {String} name - имя блока
     * @param {Object} otps - данные декларации
     * @returns {String}
     */
    getTplDecl: function(name, opts) {
        var data = { block: name },
            isElem = opts.elem && opts.elem.length;

        if(isElem) data.elem = opts.elem;
        if(opts.modName && opts.modVal) data[isElem ? 'elemMod' : 'mod'] = [opts.modName, opts.modVal];

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
     * @param {Object} data - параметры
     * @param {String} data.blockName - имя блока
     * @param {String} data.elem - имя элемента
     * @param {String} data.modName - имя модификатора
     * @param {String} data.modVal - значение модификатора
     * @returns {String}
     */
    getName: function(data) {

        return [
            this.normalizeName(data.blockName),
            this._getNameSubStr('__', data.elem),
            this._getNameSubStr('_', data.modName) + this._getNameSubStr('_', data.modVal)
        ].join('');
    },

    /**
     * Возвращает имя папки в БЭМ нотации по заданым параметрам
     * @param {Object} data - параметрв
     * @param {String} data.blockName - имя блока
     * @param {String} data.elem - имя элемента
     * @param {String} data.modName - имя модификатора
     * @returns {String}
     */
    getFolder: function(data) {

        return path.join(
            this.normalizeName(data.blockName),
            this._getNameSubStr('__', data.elem),
            this._getNameSubStr('_', data.modName));
    },

    /**
     * Хелпер для создания подстрок с заданым разделителем
     * @param {String} delimiter - разделитель
     * @param {String} str - строка
     * @returns {String}
     * @private
     */
    _getNameSubStr: function(delimiter, str) {

        return str && str.length ? delimiter + this.normalizeName(str) : '';
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

        return Object.keys(data).reduce(function(result, key) {
            var value = data[key],
                isExists = value && value.length;

            isExists && result.push([
                key,
                wrapInQuotes ?
                    "'" + value + "'" :
                    value instanceof Array ?
                        value.map(function(str) {
                            return this.normalizeName(str);
                        }, this).join(' ') :
                        value
            ].join(joiner));

            return result;

        }.bind(this), []).join(', ');
    },

    /**
     * Проверяет строку на корректность
     * @param {Function} input - входная строка
     * @returns {Object|String}
     */
    validateString: function(input) {
        if(!input.length) {
            return { err: 'ERR_EMPTY_STR' };
        }

        if(!/[a-zA-Z]/.test(input)) {
            return { err: 'ERR_INCORRECT_FORMAT' };
        }

        return true;
    }
};



