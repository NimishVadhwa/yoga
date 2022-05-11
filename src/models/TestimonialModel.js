const { Model, DataTypes } = require('sequelize');
const database = require('../database');

class testimonial extends Model { }

testimonial.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true    
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_block: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: '0',
            comment: "0 is for not block and 1 is for block"
        }
    },
    {
        sequelize: database,
        modelName: "testimonial",
        underscored: true
    }

);


module.exports = testimonial;