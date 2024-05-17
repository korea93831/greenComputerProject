// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
const User = require('./user');
// const Board=require('./board');
const TreeDraw=require('./treedraw');
const TreeAnalyze=require('./treeanalyze');
const HouseDraw=require('./housedraw');
const HouseAnalyze=require('./houseanalyze');
const PeopleDraw=require('./peopledraw');
const PeopleAnalyze=require('./peopleanalyze');
const Images=require('./images');
// const process = require('process');
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);


db.User=User;
// db.Board=Board;
db.TreeDraw=TreeDraw;
db.TreeAnalyze=TreeAnalyze;
db.HouseDraw=HouseDraw;
db.HouseAnalyze=HouseAnalyze;
db.PeopleDraw=PeopleDraw;
db.PeopleAnalyze=PeopleAnalyze;
db.Images=Images;

User.initiate(sequelize)
// Board.initiate(sequelize)
TreeDraw.initiate(sequelize)
TreeAnalyze.initiate(sequelize)
HouseDraw.initiate(sequelize)
HouseAnalyze.initiate(sequelize)
PeopleDraw.initiate(sequelize)
PeopleAnalyze.initiate(sequelize)
Images.initiate(sequelize)

User.associate(db);
// Board.associate(db);
TreeDraw.associate(db);
TreeAnalyze.associate(db);
HouseDraw.associate(db);
HouseAnalyze.associate(db);
PeopleDraw.associate(db);
Images.associate(db);

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;