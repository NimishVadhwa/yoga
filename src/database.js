const Sequelize = require('sequelize');

const sequelize = new Sequelize('yoga', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
});

module.exports = sequelize;