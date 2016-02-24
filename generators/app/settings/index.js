'use strict';

module.exports = {

    root: './desktop.blocks',

    tech: {
        js: {
            byDefault: true
        },
        md: {
            byDefault: true
        },
        css: {
            byDefault: true
        },
        test: {
            byDefault: true
        },
        deps: {
            byDefault: true
        },
        bemhtml: {
            byDefault: true
        },
        utils: { },
        model: { },
        interface: { },
        bemtree: { }
    },

    props: [
        {
            name: 'blockName',
            kind: 'argument',
            desc:'Имя элемента блока',
            valType: 'multi',
            combine: true,
            required: false
        },
        {
            name: 'elem',
            kind: 'option',
            desc:'Имя элемента блока',
            valType: 'multi',
            combine: true,
            alias: 'e'
        },
        {
            name: 'modName',
            kind: 'option',
            desc:'Имя модификатора блока',
            valType: 'multi',
            combine: true,
            alias: 'm'
        },
        {
            name: 'modVal',
            kind: 'option',
            desc:'Значение модификатора блока',
            valType: 'multi',
            combine: true,
            alias: 'v'
        },
        {
            name: 'tech',
            kind: 'option',
            desc: 'Список создаваемых технологий для блока',
            valType: 'multi',
            combine: true,
            alias: 't'
        },
        {
            name: 'baseBlock',
            kind: 'option',
            desc:'Имя базового блока',
            valType: 'multi',
            alias: 'bb'
        },
        {
            name: 'baseModel',
            kind: 'option',
            desc:'Имя базовой модели',
            valType: 'multi',
            alias: 'bm'
        },
        {
            name: 'implements',
            kind: 'option',
            desc:'Имя интерфейса блока',
            valType: 'multi',
            alias: 'i'
        }
    ]
};
