const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const user = require('./UserModel');
const group = require('./GroupModel');

class message extends Model { }

message.init(
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
        message_type: {
            type: DataTypes.ENUM('text', 'file'),
            allowNull: false,
        },
        chat_type: {
            type: DataTypes.ENUM('group','single'),
            allowNull: false,
        }
    },
    {
        sequelize: database,
        modelName: "message",
        underscored: true
    }

);

user.hasMany(message, { foreignKey: "sender_id",onDelete: "CASCADE" });
message.belongsTo(user, { foreignKey: "sender_id" });

user.hasMany(message, { foreignKey: "receiver_id", onDelete: "CASCADE" });
message.belongsTo(user, { foreignKey: "receiver_id" });

group.hasMany(message, { onDelete: "CASCADE", foreignKey: "group_id" })
message.belongsTo(group, { foreignKey: "group_id"});


module.exports = message;