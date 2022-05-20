const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const product = require('./ProductModel');
const category = require('./CategoryModel');

class media extends Model { }

media.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('gallery','banner','product'),
            allowNull: false
        }
    },
    {
        sequelize: database,
        modelName: "media",
        underscored: true
    }

);

product.hasMany(media, { onDelete: "CASCADE", foreignKey: "product_id" });
media.belongsTo(product, { foreignKey: "product_id" });

category.hasMany(media, { onDelete: "CASCADE", foreignKey: "category_id" });
media.belongsTo(category, { foreignKey: "category_id" });

module.exports = media;