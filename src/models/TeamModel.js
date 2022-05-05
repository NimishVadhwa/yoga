const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const user = require('./UserModel');
const category = require('./CategoryModel');
class Team extends Model { }

Team.init(
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
        modelName: "Team"
    }

);

user.hasOne(Team, { onDelete: "CASCADE" });
Team.belongsTo(user);

category.hasMany(Team, { onDelete: "CASCADE" });
Team.belongsTo(category);


module.exports = Team;