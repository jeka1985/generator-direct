'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    level = 'desktop.blocks';

describe('Вызов генератор direct:bemhtml', function () {
    [
        {
            title: 'без параметров',
            params: {},
            asserts: [{
                path: 'foo/foo.bemhtml',
                decl: 'block foo {\n'
            }]
        },
        {
            title: 'с параметрами --bemhtml-syntax = compact',
            params: { 'bemhtml-syntax': 'compact' },
            asserts: [{
                path: 'foo/foo.bemhtml',
                decl: 'block foo {\n'
            }]
        },
        {
            title: 'с параметрами --bemhtml-syntax = js',
            params: { 'bemhtml-syntax': 'js' },
            asserts: [{
                path: 'foo/foo.bemhtml.js',
                decl: 'block(\'foo\')(\n    content()(\'foo\')\n)'
            }]
        },
        {
            title: 'с параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            asserts: [{
                path: 'foo/_muted/foo_muted_yes.bemhtml',
                decl: 'block foo, mod muted yes'
            }]
        },
        {
            title: 'с параметром --elem',
            params: { elem: 'item' },
            asserts: [{
                path: 'foo/__item/foo__item.bemhtml',
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
                path: 'foo/__item/_view/foo__item_view_inline.bemhtml',
                decl: 'block foo, elem item, elemMod view inline'
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
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_inline.bemhtml',
                    decl: 'block b-some, elem wrap, elemMod kind inline'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_inline.bemhtml',
                    decl: 'block b-some, elem wrap, elemMod type inline'
                },
                {
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_block.bemhtml',
                    decl: 'block b-some, elem wrap, elemMod kind block'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_block.bemhtml',
                    decl: 'block b-some, elem wrap, elemMod type block'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_inline.bemhtml',
                    decl: 'block b-some, elem item, elemMod kind inline'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_inline.bemhtml',
                    decl: 'block b-some, elem item, elemMod type inline'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_block.bemhtml',
                    decl: 'block b-some, elem item, elemMod kind block'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_block.bemhtml',
                    decl: 'block b-some, elem item, elemMod type block'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_inline.bemhtml',
                    decl: 'block b-other, elem wrap, elemMod kind inline'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_inline.bemhtml',
                    decl: 'block b-other, elem wrap, elemMod type inline'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_block.bemhtml',
                    decl: 'block b-other, elem wrap, elemMod kind block'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_block.bemhtml',
                    decl: 'block b-other, elem wrap, elemMod type block'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_inline.bemhtml',
                    decl: 'block b-other, elem item, elemMod kind inline'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_inline.bemhtml',
                    decl: 'block b-other, elem item, elemMod type inline'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_block.bemhtml',
                    decl: 'block b-other, elem item, elemMod kind block'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_block.bemhtml',
                    decl: 'block b-other, elem item, elemMod type block'
                }
            ]
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            before(function (done) {
                test.prepare(done, desc.params, 'bemhtml');
            });

            desc.asserts.forEach(function(params) {
                describe('создает файл' + params.path, function () {
                    it('с содержанием соответсвующим параметрам', function () {
                        assert.fileContent(path.join(level, params.path), params.decl);
                    });
                });
            });
        });
    });
});
