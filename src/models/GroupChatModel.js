const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const user = require('./UserModel');
const group = require('./GroupModel');

class GroupChat extends Model { }

GroupChat.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize: database,
        modelName: "GroupChat"
    }

);

user.hasMany(GroupChat, { onDelete: "CASCADE" });
GroupChat.belongsTo(user);

group.hasMany(GroupChat, { onDelete: "CASCADE" });
GroupChat.belongsTo(group);


module.exports = GroupChat;