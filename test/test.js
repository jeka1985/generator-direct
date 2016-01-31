'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Генератор direct:test', function () {
    [
        {

            title: 'Без параметров',
            params: {},
            path: 'foo/foo.test.js',
            decl: 'describe(\'foo\''
        },
        {

            title: 'С параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            path: 'foo/_muted/foo_muted_yes.test.js',
            decl: 'describe(\'foo_muted_yes\''
        },
        {

            title: 'С параметром --elem',
            params: { elem: 'item' },
            path: 'foo/__item/foo__item.test.js',
            decl: 'describe(\'foo__item\''
        },
        {

            title: 'С параметрами --elem --modName --modVal',
            params: {
                elem: 'item',
                modName: 'view',
                modVal: 'inline'
            },
            path: 'foo/__item/_view/foo__item_view_inline.test.js',
            decl:  'describe(\'foo__item_view_inline\''
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            beforeEach(function (done) {
                test.prepare(done, desc.params, 'test');
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
