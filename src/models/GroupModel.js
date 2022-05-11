const { Model, DataTypes } = require('sequelize');
const database = require('../database');

class group extends Model { }

group.init(
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
            allowNull: false,
        },
        roomname: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: database,
        modelName: "group",
        underscored: true
    }

);


module.exports = group;