'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Генератор direct:model', function () {
    [
        {
            title: 'Без параметров',
            params: {},
            asserts: [{
                path: 'foo/foo.vm.js',
                decl: 'BEM.MODEL.decl({ model: \'foo\' }'
            }]
        },
        {
            title: 'С параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            asserts: [{
                path: 'foo/_muted/foo_muted_yes.vm.js',
                decl: 'BEM.MODEL.decl({ model: \'foo_muted_yes\' }'
            }]
        },
        {
            title: 'С параметром --elem',
            params: { elem: 'item' },
            asserts: [{
                path: 'foo/__item/foo__item.vm.js',
                decl: 'BEM.MODEL.decl({ model: \'foo__item\' }'
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
                path: 'foo/__item/_view/foo__item_view_inline.vm.js',
                decl: 'BEM.MODEL.decl({ model: \'foo__item_view_inline\' }'
            }]
        },
        {
            title: 'С параметром --baseBlock',
            params: { baseModel: 'i-glue' },
            asserts: [{
                path: 'foo/foo.vm.js',
                decl: 'BEM.MODEL.decl({ model: \'foo\', baseModel: \'i-glue\' }'
            }]
        },
        {
            title: 'если имя блока начинается с dm-',
            params: {
                blockName: 'dm-model'
            },
            asserts: [{
                path: 'dm-model/dm-model.js',
                decl: 'BEM.MODEL.decl({ model: \'dm-model\' }'
            }]
        },
        {
            title: 'если имя блока начинается с vm-',
            params: {
                blockName: 'vm-model'
            },
            asserts: [{
                path: 'vm-model/vm-model.js',
                decl: 'BEM.MODEL.decl({ model: \'vm-model\' }'
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
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_inline.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-some__wrap_kind_inline\' }'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_inline.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-some__wrap_type_inline\' }'
                },
                {
                    path: 'b-some/__wrap/_kind/b-some__wrap_kind_block.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-some__wrap_kind_block\' }'
                },
                {
                    path: 'b-some/__wrap/_type/b-some__wrap_type_block.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-some__wrap_type_block\' }'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_inline.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-some__item_kind_inline\' }'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_inline.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-some__item_type_inline\' }'
                },
                {
                    path: 'b-some/__item/_kind/b-some__item_kind_block.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-some__item_kind_block\' }'
                },
                {
                    path: 'b-some/__item/_type/b-some__item_type_block.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-some__item_type_block\' }'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_inline.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-other__wrap_kind_inline\' }'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_inline.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-other__wrap_type_inline\' }'
                },
                {
                    path: 'b-other/__wrap/_kind/b-other__wrap_kind_block.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-other__wrap_kind_block\' }'
                },
                {
                    path: 'b-other/__wrap/_type/b-other__wrap_type_block.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-other__wrap_type_block\' }'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_inline.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-other__item_kind_inline\' }'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_inline.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-other__item_type_inline\' }'
                },
                {
                    path: 'b-other/__item/_kind/b-other__item_kind_block.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-other__item_kind_block\' }'
                },
                {
                    path: 'b-other/__item/_type/b-other__item_type_block.vm.js',
                    decl:  'BEM.MODEL.decl({ model: \'b-other__item_type_block\' }'
                }
            ]
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            before(function (done) {
                test.prepare(done, desc.params, 'model');
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
