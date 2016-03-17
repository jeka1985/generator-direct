var u = require('../../common/utils'),
    classes = require('../../common/classes'),
    interactions = require('../../common/settings');

module.exports = u.generator.compose(classes.constructor, classes.behavior, {

    interactions: interactions.pick([
        'blockName',
        'elem',
        'modName',
        'modVal',
        'delete'
    ]),

    fileExt: '.bemtree.xjst',

    _getData: function(inputData) {
        return {
            declaration: u.bem.getTplDecl(inputData.blockName, inputData)
        };
    }

});
