'use strict';
var assert = require('yeoman-assert'),
    path = require('path'),
    helpers = require('yeoman-test'),
    root = './desktop.blocks';

describe('Вызов генератор direct', function () {
    [
        'bemhtml',
        'bemtree',
        'css',
        'deps',
        'interface',
        'js',
        'md',
        'model',
        'test',
        'utils'
    ].forEach(function(tech) {
        describe('с tech ' + tech, function () {

            describe('как параметром', function () {

                beforeEach(function (done) {
                    this.app = helpers.run(require.resolve('../generators/app'))
                        .withArguments(['t-block'])
                        .withOptions({ tech: tech })
                        .withGenerators([require.resolve('../generators/' + tech)])
                        .on('end', done);
                });

                it('создает файл технологии с помощью саб генератора', function () {
                    assert.file([
                        path.join(root, 't-block/t-block' + this.app.generator._getFileExt(({ blockName: 't-block', tech: tech })))
                    ]);
                });
            });

            describe('как prompt ответом', function () {

                before(function (done) {
                    this.app = helpers.run(require.resolve('../generators/app'))
                        .withArguments(['t-block'])
                        .withPrompts({ tech: [tech] })
                        .withGenerators([require.resolve('../generators/' + tech)])
                        .on('end', done);
                });

                it('создает файл технологии с помощью саб генератора', function () {
                    assert.file([
                        path.join(root, 't-block/t-block' + this.app.generator._getFileExt(({ blockName: 't-block', tech: tech })))
                    ]);
                });
            })
        });
    });
});
