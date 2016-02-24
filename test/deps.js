'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks',
    emptyDecl = '([\n    {\n        mustDeps: [ \n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n';

describe('Генератор direct:deps', function () {
    [
        {
            title: 'Без параметров',
            params: {},
            asserts: [{
                path: 'foo/foo.deps.js',
                decl: emptyDecl
            }]
        },
        {
            title: 'С параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            asserts: [{
                path: 'foo/_muted/foo_muted_yes.deps.js',
                decl: '([\n    {\n        mustDeps: [ \n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
            }]
        },
        {
            title: 'С параметром --elem',
            params: { elem: 'item' },
            asserts: [{
                path: 'foo/__item/foo__item.deps.js',
                decl: '([\n    {\n        mustDeps: [ \n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
            }]
        },
        {
            title: 'С параметрами --elem --modName --modVal',
            params: {
                elem: 'item',
                modName: 'view',
                modVal: 'inline'
            },
            asserts: [{
                path: 'foo/__item/_view/foo__item_view_inline.deps.js',
                decl: '([\n    {\n        mustDeps: [ \n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
            }]
        },
        {
            title: 'С параметром --baseBlock',
            params: { baseBlock: 'i-glue' },
            asserts: [{
                path: 'foo/foo.deps.js',
                decl: '([\n    {\n        mustDeps: [ \n            { block: \'i-glue\' }\n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
            }]
        },
        {
            title: 'С параметром --baseModel',
            params: { baseModel: 'vm-base' },
            asserts: [{
                path: 'foo/foo.deps.js',
                decl: '([\n    {\n        mustDeps: [ \n            { block: \'vm-base\' }\n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
            }]
        },
        {
            title: 'С параметром --implements',
            params: { implements: 'i-int' },
            asserts: [{
                path: 'foo/foo.deps.js',
                decl: '([\n    {\n        mustDeps: [ \n            { block: \'i-int\' }\n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
            }]
        },
        {
            title: 'С параметром --baseModel --implements --baseBlock',
            params: {
                baseBlock: 'i-glue',
                implements: 'i-int',
                baseModel: 'vm-base'
            },
            asserts: [{
                path: 'foo/foo.deps.js',
                decl: '([\n    {\n        mustDeps: [ \n            { block: \'i-glue\' }, \n            { block: \'vm-base\' }, \n            { block: \'i-int\' }\n        ],\n        shouldDeps: [ \n        ]\n    }\n])\n'
            }]
        },
        {
            title: 'с множественным значением blockName --elem --modName --modVal',
            params: {
                blockName: 'b-some,b-other',
                elem: 'wrap,item',
                modName: 'kind,type',
                modVal: 'inline,block'
            },
            asserts: [
                {
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_inline.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_inline.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_block.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_block.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_inline.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_inline.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_block.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_block.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_inline.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_inline.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_block.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_block.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_inline.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_inline.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_block.deps.js',
                    decl: emptyDecl
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_block.deps.js',
                    decl: emptyDecl
                }
            ]
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            before(function (done) {
                test.prepare(done, desc.params, 'deps');
            });

            desc.asserts.forEach(function(params) {
                describe('создает файл ' + params.path, function () {
                    it('именованный и размещенный согласно БЕМ нотации', function () {
                        assert.file(path.join(root, params.path));
                    });

                    it('с декларацией соответсвующей параметрам', function () {
                        assert.fileContent(path.join(root, params.path), params.decl);
                    });
                });
            });
        });
    });
});
