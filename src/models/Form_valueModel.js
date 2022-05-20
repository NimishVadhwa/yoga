const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const user = require('./UserModel');
const form_fields = require('./Form_feildModel')

class form_value extends Model { }

form_value.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false
        }
        
    },
    {
        sequelize: database,
        modelName: "form_value",
        underscored: true
    }

);

user.hasMany(form_value, { onDelete: "CASCADE", foreignKey: "user_id"  });
form_value.belongsTo(user, { foreignKey: "user_id" });

form_fields.hasMany(form_value, { onDelete: "CASCADE", foreignKey: "field_id" });
form_value.belongsTo(form_fields, { foreignKey: "field_id" });

module.exports = form_value;