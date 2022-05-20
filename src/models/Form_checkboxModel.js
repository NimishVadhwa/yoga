const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const form_feild = require('./Form_feildModel');

class form_checkbox extends Model { }

form_checkbox.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
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
        modelName: "form_checkbox",
        underscored: true
    }

);

form_feild.hasMany(form_checkbox, { onDelete: "CASCADE", foreignKey: "field_id" });
form_checkbox.belongsTo(form_feild, { foreignKey: "field_id" });


module.exports = form_checkbox;