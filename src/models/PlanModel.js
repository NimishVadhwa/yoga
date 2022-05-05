const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const category = require('./CategoryModel');

class Plan extends Model { }

Plan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
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
        modelName: "Plan"
    }

);

category.hasMany(Plan, { onDelete: "CASCADE" });
Plan.belongsTo(category);


module.exports = Plan;