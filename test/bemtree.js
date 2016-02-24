'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Вызов генератор direct:bemtree', function () {
    [
        {
            title: 'без параметров',
            params: {},
            asserts: [{
                path: 'foo/foo.bemtree.xjst',
                decl: 'block foo'
            }]
        },
        {
            title: 'с параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            asserts: [{
                path: 'foo/_muted/foo_muted_yes.bemtree.xjst',
                decl: 'block foo, mod muted yes'
            }]
        },
        {
            title: 'с параметром --elem',
            params: { elem: 'item' },
            asserts: [{
                path: 'foo/__item/foo__item.bemtree.xjst',
                decl: 'block foo, elem item'
            }]
        },
        {
            title: 'с параметрами --elem --modName --modVal',
            params: {
                elem: 'item',
                modName: 'view',
                modVal: 'inline'
            },
            asserts: [{
                path: 'foo/__item/_view/foo__item_view_inline.bemtree.xjst',
                decl: 'block foo, elem item, elemMod view inline'
            }]
        },

        {
            title: 'с множественным значением blockName --modName --modVal',
            params: {
                blockName: 'b-some,b-other',
                modName: 'kind,type',
                modVal: 'inline,block'
            },
            asserts: [
                {
                    path: 'b-some/_kind/b-some_kind_inline.bemtree.xjst',
                    decl: 'block b-some, mod kind inline'
                },
                {
                    path: 'b-some/_type/b-some_type_inline.bemtree.xjst',
                    decl: 'block b-some, mod type inline'
                },
                {
                    path: 'b-some/_kind/b-some_kind_block.bemtree.xjst',
                    decl: 'block b-some, mod kind block'
                },
                {
                    path: 'b-some/_type/b-some_type_block.bemtree.xjst',
                    decl: 'block b-some, mod type block'
                },
                {
                    path: 'b-other/_kind/b-other_kind_inline.bemtree.xjst',
                    decl: 'block b-other, mod kind inline'
                },
                {
                    path: 'b-other/_type/b-other_type_inline.bemtree.xjst',
                    decl: 'block b-other, mod type inline'
                },
                {
                    path: 'b-other/_kind/b-other_kind_block.bemtree.xjst',
                    decl: 'block b-other, mod kind block'
                },
                {
                    path: 'b-other/_type/b-other_type_block.bemtree.xjst',
                    decl: 'block b-other, mod type block'
                }
            ]
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
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_inline.bemtree.xjst',
                    decl: 'block b-some, elem wrap, elemMod kind inline'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_inline.bemtree.xjst',
                    decl: 'block b-some, elem wrap, elemMod type inline'
                },
                {
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_block.bemtree.xjst',
                    decl: 'block b-some, elem wrap, elemMod kind block'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_block.bemtree.xjst',
                    decl: 'block b-some, elem wrap, elemMod type block'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_inline.bemtree.xjst',
                    decl: 'block b-some, elem item, elemMod kind inline'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_inline.bemtree.xjst',
                    decl: 'block b-some, elem item, elemMod type inline'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_block.bemtree.xjst',
                    decl: 'block b-some, elem item, elemMod kind block'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_block.bemtree.xjst',
                    decl: 'block b-some, elem item, elemMod type block'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_inline.bemtree.xjst',
                    decl: 'block b-other, elem wrap, elemMod kind inline'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_inline.bemtree.xjst',
                    decl: 'block b-other, elem wrap, elemMod type inline'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_block.bemtree.xjst',
                    decl: 'block b-other, elem wrap, elemMod kind block'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_block.bemtree.xjst',
                    decl: 'block b-other, elem wrap, elemMod type block'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_inline.bemtree.xjst',
                    decl: 'block b-other, elem item, elemMod kind inline'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_inline.bemtree.xjst',
                    decl: 'block b-other, elem item, elemMod type inline'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_block.bemtree.xjst',
                    decl: 'block b-other, elem item, elemMod kind block'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_block.bemtree.xjst',
                    decl: 'block b-other, elem item, elemMod type block'
                }
            ]
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            beforeEach(function (done) {
                test.prepare(done, desc.params, 'bemtree');
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
