//  To use sequelize wo also need mysql2 third party package
//  sequelize works on mysql2 in backend
const Sequelize = require('sequelize');
const sequelize = new Sequelize('FirstProject','root','maazdanish',{dialect:'mysql',host:'localhost'});

module.exports = sequelize;