const db = require('../utils/database');

const { DataTypes } = require('sequelize');
const Users = require('./users.models');

const Tasks = db.define("tasks",
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        is_complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: 'id'
            }
        }
});

module.exports = Tasks;
