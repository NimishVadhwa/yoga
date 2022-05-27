const { Model, DataTypes } = require('sequelize');
const database = require('../database');
const category = require('./CategoryModel');

class plan extends Model { }

plan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        image:{
            type:DataTypes.TEXT,
            allowNull: false,
        },
        price:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        focus: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender_allowed: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age_range: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        schedule: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total_sessions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        validity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        benefits: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        frequency: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        inclusion: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        modelName: "plan",
        underscored: true
    }

);

category.hasMany(plan, { onDelete: "CASCADE", foreignKey: "category_id" });
plan.belongsTo(category, { foreignKey: "category_id"});


module.exports = plan;