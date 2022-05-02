const Sequelize = require('sequelize');

const sequelize = new Sequelize('yoga', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: true
});

module.exports = sequelize;