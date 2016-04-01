'use strict';

var _ = require('lodash');

var declaration = [
    {
        name: 'blockName',
        kind: 'argument',
        descKey: 'BLOCK_NAME',
        valType: 'multi',
        combine: true,
        required: false
    },
    {
        name: 'elem',
        kind: 'option',
        descKey: 'ELEM_NAME',
        valType: 'multi',
        combine: true,
        alias: 'e'
    },
    {
        name: 'modName',
        kind: 'option',
        descKey: 'MODIFIER_NAME',
        valType: 'multi',
        combine: true,
        alias: 'm'
    },
    {
        name: 'modVal',
        kind: 'option',
        descKey: 'MODIFIER_VAL',
        valType: 'multi',
        combine: true,
        alias: 'v'
    },
    {
        name: 'tech',
        kind: 'option',
        descKey: 'TECH_LIST',
        valType: 'multi',
        combine: true,
        alias: 't'
    },
    {
        name: 'baseBlock',
        kind: 'option',
        descKey: 'BASE_BLOCK_NAME',
        valType: 'single',
        alias: 'bb'
    },
    {
        name: 'baseModel',
        kind: 'option',
        descKey: 'BASE_MODEL_NAME',
        valType: 'single',
        alias: 'bm'
    },
    {
        name: 'implements',
        kind: 'option',
        descKey: 'INTERFACE_NAME',
        valType: 'single',
        alias: 'i'
    },
    {
        name: 'delete',
        kind: 'option',
        descKey: 'DELETE_FLAG',
        valType: 'boolean',
        alias: 'd'
    },
    {
        name: 'bemhtml-syntax',
        kind: 'option',
        descKey: 'BEMHTML_SYNTAX',
        valType: 'single'
    },
    {
        name: 'level',
        kind: 'option',
        descKey: 'REDEFINITION_LEVEL',
        valType: 'single',
        alias: 'l'
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
        return this.pick([
            'blockName',
            'elem',
            'modName',
            'modVal',
            'delete',
            'level'
        ]);
    },

    all: function() {
        return _.clone(declaration)
    }
};
