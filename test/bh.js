'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Вызов генератор direct:bh', function () {
    [
        {
            title: 'без параметров',
            params: {},
            asserts: [{
                path: 'foo/foo.bh.js',
                decl: 'bh.match(\'foo\', function(ctx) {\n    ctx\n        .content(\'foo\');\n});'
            }]
        },
        {
            title: 'с параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            asserts: [{
                path: 'foo/_muted/foo_muted_yes.bh.js',
                decl: 'bh.match(\'foo_muted_yes\', function(ctx) {\n    ctx\n        .content(\'foo_muted_yes\');\n});'
            }]
        },
        {
            title: 'с параметром --elem',
            params: { elem: 'item' },
            asserts: [{
                path: 'foo/__item/foo__item.bh.js',
                decl: 'bh.match(\'foo__item\', function(ctx) {\n    ctx\n        .content(\'foo__item\');\n});'
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
                path: 'foo/__item/_view/foo__item_view_inline.bh.js',
                decl: 'bh.match(\'foo__item_view_inline\', function(ctx) {\n    ctx\n        .content(\'foo__item_view_inline\');\n});'
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
                    path: 'b-some/_kind/b-some_kind_inline.bh.js',
                    decl: 'bh.match(\'b-some_kind_inline\', function(ctx) {\n    ctx\n        .content(\'b-some_kind_inline\');\n});'
                },
                {
                    path: 'b-some/_type/b-some_type_inline.bh.js',
                    decl: 'bh.match(\'b-some_type_inline\', function(ctx) {\n    ctx\n        .content(\'b-some_type_inline\');\n});'
                },
                {
                    path: 'b-some/_kind/b-some_kind_block.bh.js',
                    decl: 'bh.match(\'b-some_kind_block\', function(ctx) {\n    ctx\n        .content(\'b-some_kind_block\');\n});'
                },
                {
                    path: 'b-some/_type/b-some_type_block.bh.js',
                    decl: 'bh.match(\'b-some_type_block\', function(ctx) {\n    ctx\n        .content(\'b-some_type_block\');\n});'
                },
                {
                    path: 'b-other/_kind/b-other_kind_inline.bh.js',
                    decl: 'bh.match(\'b-other_kind_inline\', function(ctx) {\n    ctx\n        .content(\'b-other_kind_inline\');\n});'
                },
                {
                    path: 'b-other/_type/b-other_type_inline.bh.js',
                    decl: 'bh.match(\'b-other_type_inline\', function(ctx) {\n    ctx\n        .content(\'b-other_type_inline\');\n});'
                },
                {
                    path: 'b-other/_kind/b-other_kind_block.bh.js',
                    decl: 'bh.match(\'b-other_kind_block\', function(ctx) {\n    ctx\n        .content(\'b-other_kind_block\');\n});'
                },
                {
                    path: 'b-other/_type/b-other_type_block.bh.js',
                    decl: 'bh.match(\'b-other_type_block\', function(ctx) {\n    ctx\n        .content(\'b-other_type_block\');\n});'
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
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_inline.bh.js',
                    decl: 'bh.match(\'b-some__wrap_kind_inline\', function(ctx) {\n    ctx\n        .content(\'b-some__wrap_kind_inline\');\n});'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_inline.bh.js',
                    decl: 'bh.match(\'b-some__wrap_type_inline\', function(ctx) {\n    ctx\n        .content(\'b-some__wrap_type_inline\');\n});'
                },
                {
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_block.bh.js',
                    decl: 'bh.match(\'b-some__wrap_kind_block\', function(ctx) {\n    ctx\n        .content(\'b-some__wrap_kind_block\');\n});'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_block.bh.js',
                    decl: 'bh.match(\'b-some__wrap_type_block\', function(ctx) {\n    ctx\n        .content(\'b-some__wrap_type_block\');\n});'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_inline.bh.js',
                    decl: 'bh.match(\'b-some__item_kind_inline\', function(ctx) {\n    ctx\n        .content(\'b-some__item_kind_inline\');\n});'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_inline.bh.js',
                    decl: 'bh.match(\'b-some__item_type_inline\', function(ctx) {\n    ctx\n        .content(\'b-some__item_type_inline\');\n});'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_block.bh.js',
                    decl: 'bh.match(\'b-some__item_kind_block\', function(ctx) {\n    ctx\n        .content(\'b-some__item_kind_block\');\n});'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_block.bh.js',
                    decl: 'bh.match(\'b-some__item_type_block\', function(ctx) {\n    ctx\n        .content(\'b-some__item_type_block\');\n});'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_inline.bh.js',
                    decl: 'bh.match(\'b-other__wrap_kind_inline\', function(ctx) {\n    ctx\n        .content(\'b-other__wrap_kind_inline\');\n});'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_inline.bh.js',
                    decl: 'bh.match(\'b-other__wrap_type_inline\', function(ctx) {\n    ctx\n        .content(\'b-other__wrap_type_inline\');\n});'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_block.bh.js',
                    decl: 'bh.match(\'b-other__wrap_kind_block\', function(ctx) {\n    ctx\n        .content(\'b-other__wrap_kind_block\');\n});'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_block.bh.js',
                    decl: 'bh.match(\'b-other__wrap_type_block\', function(ctx) {\n    ctx\n        .content(\'b-other__wrap_type_block\');\n});'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_inline.bh.js',
                    decl: 'bh.match(\'b-other__item_kind_inline\', function(ctx) {\n    ctx\n        .content(\'b-other__item_kind_inline\');\n});'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_inline.bh.js',
                    decl: 'bh.match(\'b-other__item_type_inline\', function(ctx) {\n    ctx\n        .content(\'b-other__item_type_inline\');\n});'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_block.bh.js',
                    decl: 'bh.match(\'b-other__item_kind_block\', function(ctx) {\n    ctx\n        .content(\'b-other__item_kind_block\');\n});'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_block.bh.js',
                    decl: 'bh.match(\'b-other__item_type_block\', function(ctx) {\n    ctx\n        .content(\'b-other__item_type_block\');\n});'
                }
            ]
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            before(function (done) {
                test.prepare(done, desc.params, 'bh');
            });

            desc.asserts.forEach(function(params) {
                describe('создает файл' + params.path, function () {
                    it('с содержанием соответсвующим параметрам', function () {
                        assert.fileContent(path.join(root, params.path), params.decl);
                    });
                });
            });
        });
    });
});
