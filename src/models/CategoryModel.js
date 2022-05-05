const { Model, DataTypes } = require('sequelize');
const database = require('../database');

class Category extends Model { }

Category.init(
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
        is_block: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: "0",
            comment: "0 is for unblock and 1 is for block"
        },
        type: {
            type: DataTypes.ENUM('department','plan'),
            allowNull: false
        }
    },
    {
        sequelize: database,
        modelName: "Category"
    }

);


module.exports = Category;