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
        label: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        column_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        column_type: {
            type: DataTypes.ENUM('text', 'checkbox', 'file', 'email'),
            allowNull: false,
            defaultValue: 'text'
        },
        file_type: {
            type: DataTypes.ENUM('image', 'doc', 'video'),
            allowNull: true,
        },
        is_required: {
            type: DataTypes.ENUM('1', '0'),
            allowNull: false,
            defaultValue: '1',
            comment: "0 is for not required the field and 1 is for required the field"
        },
        is_block: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: '0',
            comment: "0 is for not block and 1 is for block"
        },
        index_no: {
            type: DataTypes.BIGINT,
            allowNull: true
        }
    },
    {
        sequelize: database,
        modelName: "form_feild",
        underscored: true
    }

);

category.hasMany(form_feild, { onDelete: "CASCADE", foreignKey: "category_id"  });
form_feild.belongsTo(category, { foreignKey: "category_id" });


module.exports = form_feild;