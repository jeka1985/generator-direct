'use strict';
var assert = require('yeoman-assert'),
    path = require('path'),
    helpers = require('yeoman-test'),
    level = 'desktop.blocks',
    customLevel = 'common.blocks';

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
                        path.join(level, 't-block/t-block' + this.app.generator._getFileExt({
                            blockName: 't-block',
                            tech: tech
                        }))
                    ]);
                });
            });

            describe('как prompt ответом', function () {

                beforeEach(function (done) {
                    this.app = helpers.run(require.resolve('../generators/app'))
                        .withArguments(['t-block'])
                        .withPrompts({ tech: [tech] })
                        .withGenerators([require.resolve('../generators/' + tech)])
                        .on('end', done);
                });

                it('создает файл технологии с помощью саб генератора', function () {
                    assert.file([
                        path.join(level, 't-block/t-block' + this.app.generator._getFileExt({
                            blockName: 't-block',
                            tech: tech
                        }))
                    ]);
                });
            });
        });

        describe('с --level ' + customLevel, function () {

            beforeEach(function (done) {
                this.app = helpers.run(require.resolve('../generators/app'))
                    .withArguments(['t-block'])
                    .withOptions({
                        level: customLevel,
                        tech: tech
                    })
                    .withGenerators([require.resolve('../generators/' + tech)])
                    .on('end', done);
            });

            it('размещает файл на корретном уровне', function () {
                assert.file([
                    path.join(customLevel, 't-block/t-block' + this.app.generator._getFileExt({
                        blockName: 't-block',
                        level: customLevel,
                        tech: tech
                    }))
                ]);
            });
        });
    });
});
