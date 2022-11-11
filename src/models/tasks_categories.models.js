const db = require("../utils/database");

const { DataTypes } = require('sequelize');


const Tasks_categories = db.define("tasks_categories", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    task_id: {
        type: DataTypes.INTEGER
    },
    category_id: {
        type: DataTypes.INTEGER
    }
});

module.exports = Tasks_categories;