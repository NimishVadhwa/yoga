const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const user = require('./UserModel');
const category = require('./CategoryModel');

class role extends Model { }

role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        is_trainee: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: false,
            defaultValue: '0',
            comment: "0 is for not trainee and 1 is for trainee"
        },
        request: {
            type: DataTypes.ENUM('accept', 'reject','pending'),
            allowNull: true
        }
    },
    {
        sequelize: database,
        modelName: "role",
        underscored: true
    }

);

user.hasOne(role, { onDelete: "CASCADE", foreignKey: "user_id" });
role.belongsTo(user, { foreignKey: "user_id" });

category.hasMany(role, { onDelete: "CASCADE", foreignKey: "category_id" });
role.belongsTo(category, { foreignKey: "category_id" });


module.exports = role;