const Sequelize = require('sequelize');
const sequelize = require('../config/config.json');

class InterpretationTree extends Sequelize.Model {}

InterpretationTree.init({
    analysis_tree_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    keyword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    analysis_tree: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'InterpretationTree',
    tableName: 'interpretationstree',
    timestamps: false, 
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = InterpretationTree;