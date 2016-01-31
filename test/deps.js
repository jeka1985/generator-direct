'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Генератор direct:deps', function () {
    [
        {

            title: 'Без параметров',
            params: {},
            path: 'foo/foo.deps.js',
            decl: '([\n    {\n        mustDeps: [ \n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
        },
        {

            title: 'С параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            path: 'foo/_muted/foo_muted_yes.deps.js',
            decl: '([\n    {\n        mustDeps: [ \n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
        },
        {

            title: 'С параметром --elem',
            params: { elem: 'item' },
            path: 'foo/__item/foo__item.deps.js',
            decl: '([\n    {\n        mustDeps: [ \n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
        },
        {

            title: 'С параметрами --elem --modName --modVal',
            params: {
                elem: 'item',
                modName: 'view',
                modVal: 'inline'
            },
            path: 'foo/__item/_view/foo__item_view_inline.deps.js',
            decl: '([\n    {\n        mustDeps: [ \n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
        },
        {

            title: 'С параметром --baseBlock',
            params: { baseBlock: 'i-glue' },
            path: 'foo/foo.deps.js',
            decl: '([\n    {\n        mustDeps: [ \n            { block: \'i-glue\' }\n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
        },
        {

            title: 'С параметром --baseModel',
            params: { baseModel: 'vm-base' },
            path: 'foo/foo.deps.js',
            decl: '([\n    {\n        mustDeps: [ \n            { block: \'vm-base\' }\n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
        },
        {

            title: 'С параметром --implements',
            params: { implements: 'i-int' },
            path: 'foo/foo.deps.js',
            decl: '([\n    {\n        mustDeps: [ \n            { block: \'i-int\' }\n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
        },
        {

            title: 'С параметром --baseModel --implements --baseBlock',
            params: {
                baseBlock: 'i-glue',
                implements: 'i-int',
                baseModel: 'vm-base'
            },
            path: 'foo/foo.deps.js',
            decl: '([\n    {\n        mustDeps: [ \n            { block: \'i-glue\' }, \n            { block: \'vm-base\' }, \n            { block: \'i-int\' }\n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            beforeEach(function (done) {
                test.prepare(done, desc.params, 'deps');
            });

            it('файл именован и размещен согласно БЕМ нотации', function () {
                assert.file(path.join(root, desc.path));
            });

            it('декларация соответсвует параметрам', function () {
                assert.fileContent(path.join(root, desc.path), desc.decl);
            });
        });
    });
});
