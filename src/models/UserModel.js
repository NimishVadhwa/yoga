const { Model, DataTypes } = require('sequelize');
const database = require('../database');

class user extends Model { }

user.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "this is the token which is generated while login"
        },
        fcm_token: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "This is the fire base token"
        },
        otp: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_influence: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: '0',
            comment: "0 is for not influence and 1 is for influence"
        },
        is_activated: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: '0',
            comment: "0 is for not activate and 1 is for activate"
        },
        type: {
            type: DataTypes.ENUM('user', 'team', 'admin'),
            allowNull: false,
            defaultValue: 'user'
        }
    },
    {
        sequelize: database,
        modelName: "user",
        underscored: true
        
    }

);


module.exports = user;