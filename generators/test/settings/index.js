'use strict';

module.exports = {

    root: './desktop.blocks',

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
        }
    ]
};
