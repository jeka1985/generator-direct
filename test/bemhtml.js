'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Генератор direct:bemhtml', function () {
    [
        {

            title: 'Без параметров',
            params: {},
            path: 'foo/foo.bemhtml',
            decl: 'block foo'
        },
        {

            title: 'С параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            path: 'foo/_muted/foo_muted_yes.bemhtml',
            decl: 'block foo, mod muted yes'
        },
        {

            title: 'С параметром --elem',
            params: { elem: 'item' },
            path: 'foo/__item/foo__item.bemhtml',
            decl: 'block foo, elem item'
        },
        {

            title: 'С параметрами --elem --modName --modVal',
            params: {
                elem: 'item',
                modName: 'view',
                modVal: 'inline'
            },
            path: 'foo/__item/_view/foo__item_view_inline.bemhtml',
            decl: 'block foo, elem item, elemMod view inline'
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            beforeEach(function (done) {
                test.prepare(done, desc.params, 'bemhtml');
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
