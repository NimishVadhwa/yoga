const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const user = require('./UserModel');

class user_profile extends Model { }

user_profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        insta: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        fb: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        youtube: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        }, 
        
    },
    {
        sequelize: database,
        modelName: "user_profile",
        underscored: true
    }

);

user.hasOne(user_profile, { foreignKey: "user_id", onDelete: "CASCADE" });
user_profile.belongsTo(user, { foreignKey: "user_id"});


module.exports = user_profile;