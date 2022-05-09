const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const group = require('./GroupModel');
const user = require('./UserModel');

class GroupUser extends Model { }

GroupUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        is_admin: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: '0',
            comment: "0 is for not admin and 1 is for admin"
        }
    },
    {
        sequelize: database,
        modelName: "GroupUser"
    }

);

group.hasMany(GroupUser, {onDelete: "CASCADE"});
GroupUser.belongsTo(group);

user.hasMany(GroupUser, { onDelete: "CASCADE" });
GroupUser.belongsTo(user);


module.exports = GroupUser;