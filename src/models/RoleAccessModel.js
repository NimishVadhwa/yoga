const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const menubar = require('./Menu_barModel');
const category = require('./CategoryModel');

class role_access extends Model { }

role_access.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        status: {
            type: DataTypes.ENUM('read', 'write'),
            allowNull: false
        }
    },
    {
        sequelize: database,
        modelName: "role_access",
        underscored: true
    }

);

menubar.hasOne(role_access, { onDelete: "CASCADE", foreignKey: "menubar_id" });
role_access.belongsTo(menubar, { foreignKey: "menubar_id" });

category.hasMany(role_access, { onDelete: "CASCADE", foreignKey: "category_id" });
role_access.belongsTo(category, { foreignKey: "category_id" });


module.exports = role_access;