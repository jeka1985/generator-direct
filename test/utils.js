'use strict';

var test = require('./helper.js'),
    assert = require('yeoman-assert'),
    path = require('path'),
    root = './desktop.blocks';

describe('Генератор direct:utils', function () {
    [
        {

            title: 'Без параметров',
            params: {},
            path: 'foo/foo.utils.js',
            decl: 'u.register({\n    \'foo\': {\n\n    }\n});\n'
        },
        {

            title: 'С параметрами --modName muted --modVal yes',
            params: {
                modName: 'muted',
                modVal: 'yes'
            },
            path: 'foo/_muted/foo_muted_yes.utils.js',
            decl: 'u.register({\n    \'foo_muted_yes\': {\n\n    }\n});\n'
        },
        {

            title: 'С параметром --elem',
            params: { elem: 'item' },
            path: 'foo/__item/foo__item.utils.js',
            decl: 'u.register({\n    \'foo__item\': {\n\n    }\n});\n'
        },
        {

            title: 'С параметрами --elem --modName --modVal',
            params: {
                elem: 'item',
                modName: 'view',
                modVal: 'inline'
            },
            path: 'foo/__item/_view/foo__item_view_inline.utils.js',
            decl:  'u.register({\n    \'foo__item_view_inline\': {\n\n    }\n});\n'
        }
    ].forEach(function(desc) {
        describe(desc.title, function () {
            beforeEach(function (done) {
                test.prepare(done, desc.params, 'utils');
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
