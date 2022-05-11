const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const product = require('./ProductModel');

class media extends Model { }

media.init(
    {
        id: {
            type: DataTypes.INTEGER,
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


module.exports = media;