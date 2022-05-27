const { Model, DataTypes } = require('sequelize');
const database = require('../database');

class category extends Model { }

category.init(
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
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_block: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: "0",
            comment: "0 is for unblock and 1 is for block"
        },
        type: {
            type: DataTypes.ENUM('department', 'plan', 'form','product','gallery'),
            allowNull: false
        }
    },
    {
        sequelize: database,
        modelName: "category",
        underscored: true
    }

);


module.exports = category;