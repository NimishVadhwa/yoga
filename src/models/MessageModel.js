const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const user = require('./UserModel');

class Message extends Model { }

Message.init(
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
        },
        roomname: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: database,
        modelName: "Message"
    }

);

user.hasMany(Message, {
    as: "sender",
    foreignKey: "senderId",
    onDelete: "CASCADE",
});
Message.belongsTo(user, { as: "sender" });

user.hasMany(Message, {
    as: "receiver",
    foreignKey: "receiverId",
    onDelete: "CASCADE",
});
Message.belongsTo(user, { as: "receiver" });



module.exports = Message;