const Sequelize = require('sequelize');
const config = require('../config/config.json');

const sequelizeInstance = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        define: {
            underscored: true
        }
    }
);

class InterpretationTree extends Sequelize.Model {}

InterpretationTree.init({
    analysis_tree_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    sequelize: sequelizeInstance,
    modelName: 'InterpretationTree',
    tableName: 'interpretationstree',
    timestamps: false, 
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

class InterpretationHouse extends Sequelize.Model{}
InterpretationHouse.init({
    analysis_house_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    keyword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    analysis_house: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'InterpretationHouse',
    tableName: 'interpretationshouse',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

class InterpretationPeople extends Sequelize.Model{}
InterpretationPeople.init({
    analysis_people_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    keyword: {
        type: Sequelize.STRING,
        allowNull: false
    },
    analysis_people: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'InterpretationPeople',
    tableName: 'interpretationspeople',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = {InterpretationTree, InterpretationHouse, InterpretationPeople};