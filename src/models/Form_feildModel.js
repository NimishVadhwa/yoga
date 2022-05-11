const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const category = require('./CategoryModel');

class form_feild extends Model { }

form_feild.init(
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
        modelName: "form_feild",
        underscored: true
    }

);

category.hasMany(form_feild, { onDelete: "CASCADE" });
form_feild.belongsTo(category);


module.exports = form_feild;