const { Model, DataTypes } = require('sequelize');
const database = require('../database');

class Menu_bar extends Model { }

Menu_bar.init(
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
        modelName: "Menu_bar"
    }

);

Menu_bar.hasMany(Menu_bar, { as: "sub_menu", foreignKey: "is_parent", onDelete: 'cascade' });


module.exports = Menu_bar;