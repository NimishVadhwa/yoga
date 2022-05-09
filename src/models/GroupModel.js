const { Model, DataTypes } = require('sequelize');
const database = require('../database');

class Group extends Model { }

Group.init(
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
        modelName: "Group"
    }

);


module.exports = Group;