'use strict';
var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Вызов генератор direct:js', function () {
    [
        {
            title: 'без параметров',
            params: {},
            asserts: [{
                path: 'foo/foo.js',
                decl: 'BEM.DOM.decl({ name: \'foo\' }'
            }]
        },
        {
            title: 'с параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            asserts: [{
                path: 'foo/_muted/foo_muted_yes.js',
                decl: 'BEM.DOM.decl({ name: \'foo\', modName: \'muted\', modVal: \'yes\' }'
            }]
        },
        {
            title: 'с параметром --elem',
            params: { elem: 'item' },
            asserts: [{
                path: 'foo/__item/foo__item.js',
                decl: 'BEM.DOM.decl({ name: \'foo\', elem: \'item\' }'
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
                path: 'foo/__item/_view/foo__item_view_inline.js',
                decl: 'BEM.DOM.decl({ name: \'foo\', elem: \'item\', modName: \'view\', modVal: \'inline\' }'
            }]
        },
        {
            title: 'с параметром --baseBlock',
            params: { baseBlock: 'i-glue' },
            asserts: [{
                path: 'foo/foo.js',
                decl: 'BEM.DOM.decl({ name: \'foo\', baseBlock: \'i-glue\' }'
            }]
        },
        {
            title: 'с параметром --implements',
            params: { implements: 'i-interface' },
            asserts: [{
                path: 'foo/foo.js',
                decl: 'BEM.DOM.decl({ name: \'foo\', implements: \'i-interface\' }'
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
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_inline.js',
                    decl: 'BEM.DOM.decl({ name: \'b-some\', elem: \'wrap\', modName: \'kind\', modVal: \'inline\' }'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_inline.js',
                    decl: 'BEM.DOM.decl({ name: \'b-some\', elem: \'wrap\', modName: \'type\', modVal: \'inline\' }'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_inline.js',
                    decl: 'BEM.DOM.decl({ name: \'b-some\', elem: \'item\', modName: \'kind\', modVal: \'inline\' }'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_inline.js',
                    decl: 'BEM.DOM.decl({ name: \'b-some\', elem: \'item\', modName: \'type\', modVal: \'inline\' }'
                },
                {
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_block.js',
                    decl: 'BEM.DOM.decl({ name: \'b-some\', elem: \'wrap\', modName: \'kind\', modVal: \'block\' }'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_block.js',
                    decl: 'BEM.DOM.decl({ name: \'b-some\', elem: \'wrap\', modName: \'type\', modVal: \'block\' }'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_block.js',
                    decl: 'BEM.DOM.decl({ name: \'b-some\', elem: \'item\', modName: \'kind\', modVal: \'block\' }'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_block.js',
                    decl: 'BEM.DOM.decl({ name: \'b-some\', elem: \'item\', modName: \'type\', modVal: \'block\' }'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_inline.js',
                    decl: 'BEM.DOM.decl({ name: \'b-other\', elem: \'wrap\', modName: \'kind\', modVal: \'inline\' }'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_inline.js',
                    decl: 'BEM.DOM.decl({ name: \'b-other\', elem: \'wrap\', modName: \'type\', modVal: \'inline\' }'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_inline.js',
                    decl: 'BEM.DOM.decl({ name: \'b-other\', elem: \'item\', modName: \'kind\', modVal: \'inline\' }'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_inline.js',
                    decl: 'BEM.DOM.decl({ name: \'b-other\', elem: \'item\', modName: \'type\', modVal: \'inline\' }'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_block.js',
                    decl: 'BEM.DOM.decl({ name: \'b-other\', elem: \'wrap\', modName: \'kind\', modVal: \'block\' }'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_block.js',
                    decl: 'BEM.DOM.decl({ name: \'b-other\', elem: \'wrap\', modName: \'type\', modVal: \'block\' }'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_block.js',
                    decl: 'BEM.DOM.decl({ name: \'b-other\', elem: \'item\', modName: \'kind\', modVal: \'block\' }'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_block.js',
                    decl: 'BEM.DOM.decl({ name: \'b-other\', elem: \'item\', modName: \'type\', modVal: \'block\' }'
                }
            ]
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            beforeEach(function (done) {
                test.prepare(done, desc.params, 'js');
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
