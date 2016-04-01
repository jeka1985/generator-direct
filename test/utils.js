'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    level = 'desktop.blocks';

describe('Генератор direct:utils', function () {
    [
        {
            title: 'Без параметров',
            params: {},
            asserts: [{
                path: 'foo/foo.utils.js',
                decl: 'u.register({\n    \'foo\': {\n\n    }\n});\n'
            }]
        },
        {
            title: 'С параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            asserts: [{
                path: 'foo/_muted/foo_muted_yes.utils.js',
                decl: 'u.register({\n    \'foo_muted_yes\': {\n\n    }\n});\n'
            }]
        },
        {
            title: 'С параметром --elem',
            params: { elem: 'item' },
            asserts: [{
                path: 'foo/__item/foo__item.utils.js',
                decl: 'u.register({\n    \'foo__item\': {\n\n    }\n});\n'
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
                path: 'foo/__item/_view/foo__item_view_inline.utils.js',
                decl:  'u.register({\n    \'foo__item_view_inline\': {\n\n    }\n});\n'
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
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_inline.utils.js',
                    decl:  'u.register({\n    \'b-some__wrap_kind_inline\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_inline.utils.js',
                    decl:  'u.register({\n    \'b-some__wrap_type_inline\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_block.utils.js',
                    decl:  'u.register({\n    \'b-some__wrap_kind_block\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_block.utils.js',
                    decl:  'u.register({\n    \'b-some__wrap_type_block\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_inline.utils.js',
                    decl:  'u.register({\n    \'b-some__item_kind_inline\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_inline.utils.js',
                    decl:  'u.register({\n    \'b-some__item_type_inline\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_block.utils.js',
                    decl:  'u.register({\n    \'b-some__item_kind_block\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_block.utils.js',
                    decl:  'u.register({\n    \'b-some__item_type_block\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_inline.utils.js',
                    decl:  'u.register({\n    \'b-other__wrap_kind_inline\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_inline.utils.js',
                    decl:  'u.register({\n    \'b-other__wrap_type_inline\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_block.utils.js',
                    decl:  'u.register({\n    \'b-other__wrap_kind_block\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_block.utils.js',
                    decl:  'u.register({\n    \'b-other__wrap_type_block\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_inline.utils.js',
                    decl:  'u.register({\n    \'b-other__item_kind_inline\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_inline.utils.js',
                    decl:  'u.register({\n    \'b-other__item_type_inline\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_block.utils.js',
                    decl:  'u.register({\n    \'b-other__item_kind_block\': {\n\n    }\n});\n'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_block.utils.js',
                    decl:  'u.register({\n    \'b-other__item_type_block\': {\n\n    }\n});\n'
                }
            ]
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            before(function (done) {
                test.prepare(done, desc.params, 'utils');
            });

            desc.asserts.forEach(function(params) {
                describe('создает файл ' + params.path, function () {
                    it('с содержанием соответсвующим параметрам', function () {
                        assert.fileContent(path.join(level, params.path), params.decl);
                    });
                });
            });
        });
    });
});
