const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const user = require('./UserModel');
const category = require('./CategoryModel');
class team extends Model { }

team.init(
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
        }
    },
    {
        sequelize: database,
        modelName: "team",
        underscored: true
    }

);

user.hasOne(team, { onDelete: "CASCADE", foreignKey: "user_id" });
team.belongsTo(user, { foreignKey: "user_id" });

category.hasMany(team, { onDelete: "CASCADE", foreignKey: "category_id" });
team.belongsTo(category, { foreignKey: "category_id" });


module.exports = team;