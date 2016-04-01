'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Генератор direct:css', function () {
    [
        {
            title: 'Без параметров',
            params: {},
            asserts: [{
                path: 'foo/foo.css',
                decl: '.foo\n{'
            }]
        },
        {
            title: 'С параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            asserts: [{
                path: 'foo/_muted/foo_muted_yes.css',
                decl: '.foo_muted_yes\n{'
            }]
        },
        {
            title: 'С параметром --elem',
            params: { elem: 'item' },
            asserts: [{
                path: 'foo/__item/foo__item.css',
                decl: '.foo__item\n{'
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
                path: 'foo/__item/_view/foo__item_view_inline.css',
                decl: '.foo__item_view_inline\n{'
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
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_inline.css',
                    decl: '.b-some__wrap_kind_inline\n{'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_inline.css',
                    decl: '.b-some__wrap_type_inline\n{'
                },
                {
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_block.css',
                    decl: '.b-some__wrap_kind_block\n{'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_block.css',
                    decl: '.b-some__wrap_type_block\n{'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_inline.css',
                    decl: '.b-some__item_kind_inline\n{'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_inline.css',
                    decl: '.b-some__item_type_inline\n{'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_block.css',
                    decl: '.b-some__item_kind_block\n{'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_block.css',
                    decl: '.b-some__item_type_block\n{'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_inline.css',
                    decl: '.b-other__wrap_kind_inline\n{'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_inline.css',
                    decl: '.b-other__wrap_type_inline\n{'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_block.css',
                    decl: '.b-other__wrap_kind_block\n{'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_block.css',
                    decl: '.b-other__wrap_type_block\n{'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_inline.css',
                    decl: '.b-other__item_kind_inline\n{'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_inline.css',
                    decl: '.b-other__item_type_inline\n{'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_block.css',
                    decl: '.b-other__item_kind_block\n{'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_block.css',
                    decl: '.b-other__item_type_block\n{'
                }
            ]
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            before(function (done) {
                test.prepare(done, desc.params, 'css');
            });

            desc.asserts.forEach(function(params) {
                describe('создает файл ' + params.path, function () {
                    it('с содержанием соответсвующим параметрам', function () {
                        assert.fileContent(path.join(root, params.path), params.decl);
                    });
                });
            });
        });
    });
});
