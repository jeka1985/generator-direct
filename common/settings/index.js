'use strict';

var _ = require('lodash');

var declaration = [
    {
        name: 'blockName',
        kind: 'argument',
        desc:'Block name / Имя блока',
        valType: 'multi',
        combine: true,
        required: false
    },
    {
        name: 'elem',
        kind: 'option',
        desc:'Block elem name / Имя элемента блока',
        valType: 'multi',
        combine: true,
        alias: 'e'
    },
    {
        name: 'modName',
        kind: 'option',
        desc:'Block modifier name / Имя модификатора блока',
        valType: 'multi',
        combine: true,
        alias: 'm'
    },
    {
        name: 'modVal',
        kind: 'option',
        desc:'Block modifier value / Значение модификатора блока',
        valType: 'multi',
        combine: true,
        alias: 'v'
    },
    {
        name: 'tech',
        kind: 'option',
        desc: 'Tech list / Список создаваемых технологий для блока',
        valType: 'multi',
        combine: true,
        alias: 't'
    },
    {
        name: 'baseBlock',
        kind: 'option',
        desc:'Base block name / Имя базового блока',
        valType: 'single',
        alias: 'bb'
    },
    {
        name: 'baseModel',
        kind: 'option',
        desc:'Base model name / Имя базовой модели',
        valType: 'single',
        alias: 'bm'
    },
    {
        name: 'implements',
        kind: 'option',
        desc:'Interface name / Имя интерфейса блока',
        valType: 'single',
        alias: 'i'
    },
    {
        name: 'delete',
        kind: 'option',
        desc:'Delete action flag / Флаг удаления',
        valType: 'boolean',
        alias: 'd'
    }
];

module.exports = {

    pick: function(names) {
        return declaration.reduce(function(result, item) {

            _.includes(names, item.name) && result.push(item);

            return result;
        }, [])
    },

    base: function() {
        this.pick([
            'blockName',
            'elem',
            'modName',
            'modVal',
            'delete'
        ])
    },

    all: function() {
        return _.clone(declaration)
    }
}
