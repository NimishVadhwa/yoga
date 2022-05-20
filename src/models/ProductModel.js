const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const category = require('./CategoryModel');

class product extends Model { }

product.init(
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
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qty: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('men', 'women','kid','all'),
            allowNull: false,
            defaultValue: 'all',
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
        modelName: "product",
        underscored: true
    }

);

category.hasMany(product, { onDelete: "CASCADE", foreignKey: "category_id" });
product.belongsTo(category, { foreignKey: "category_id" });


module.exports = product;