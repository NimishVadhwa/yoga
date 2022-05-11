const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const group = require('./GroupModel');
const user = require('./UserModel');

class group_user extends Model { }

group_user.init(
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
        },
        is_remove: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: '0',
            comment: "0 is for not remove and 1 is for remove"
        }
    },
    {
        sequelize: database,
        modelName: "group_user",
        underscored: true
    }

);

group.hasMany(group_user, { onDelete: "CASCADE", foreignKey: "group_id" });
group_user.belongsTo(group, { foreignKey: "group_id"});

user.hasMany(group_user, { onDelete: "CASCADE", foreignKey: "user_id"});
group_user.belongsTo(user, { foreignKey: "group_id"});


module.exports = group_user;