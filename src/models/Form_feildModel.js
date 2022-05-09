const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const category = require('./CategoryModel');

class Form_feild extends Model { }

Form_feild.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        column_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        column_type: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        min_value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: "1"
        },
        max_value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize: database,
        modelName: "Form_feild"
    }

);

category.hasMany(Form_feild, { onDelete: "CASCADE" });
Form_feild.belongsTo(category);


module.exports = Form_feild;