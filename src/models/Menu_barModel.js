const { Model, DataTypes } = require('sequelize');
const database = require('../database');

class menu_bar extends Model { }

menu_bar.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        route: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        icon: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_parent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: "0",
            comment: "0 is for parent"
        }

    },
    {
        sequelize: database,
        modelName: "menu_bar",
        underscored: true
    }

);

menu_bar.hasMany(menu_bar, { as: "sub_menu", foreignKey: "is_parent", onDelete: 'cascade' });


module.exports = menu_bar;