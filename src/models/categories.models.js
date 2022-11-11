const db = require("../utils/database");

const { DataTypes } = require('sequelize');

const Categories = db.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING        
    }

});

module.exports = Categories;