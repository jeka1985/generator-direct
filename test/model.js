'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Генератор direct:model', function () {

    describe('если имя блока начинается с dm-', function () {
        beforeEach(function (done) {
            test.prepare(done, {}, 'model', 'dm-model');
        });

        it('файл именован и размещен согласно БЕМ нотации', function () {
            assert.file(path.join(root, 'dm-model/dm-model.js'));
        });

        it('декларация соответсвует параметрам', function () {
            assert.fileContent(
                path.join(root, 'dm-model/dm-model.js'),
                'BEM.MODEL.decl({ model: \'dm-model\' }');
        });
    });

    [
        {

            title: 'Без параметров',
            params: {},
            path: 'foo/foo.vm.js',
            decl: 'BEM.MODEL.decl({ model: \'foo\' }'
        },
        {

            title: 'С параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            path: 'foo/_muted/foo_muted_yes.vm.js',
            decl: 'BEM.MODEL.decl({ model: \'foo_muted_yes\' }'
        },
        {

            title: 'С параметром --elem',
            params: { elem: 'item' },
            path: 'foo/__item/foo__item.vm.js',
            decl: 'BEM.MODEL.decl({ model: \'foo__item\' }'
        },
        {

            title: 'С параметрами --elem --modName --modVal',
            params: {
                elem: 'item',
                modName: 'view',
                modVal: 'inline'
            },
            path: 'foo/__item/_view/foo__item_view_inline.vm.js',
            decl: 'BEM.MODEL.decl({ model: \'foo__item_view_inline\' }'
        },
        {

            title: 'С параметром --baseBlock',
            params: { baseModel: 'i-glue' },
            path: 'foo/foo.vm.js',
            decl: 'BEM.MODEL.decl({ model: \'foo\', baseModel: \'i-glue\' }'
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            beforeEach(function (done) {
                test.prepare(done, desc.params, 'model');
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
