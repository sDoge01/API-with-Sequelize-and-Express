const db = require('../utils/database')

const { DataTypes } = require('sequelize');
const Users = require('./users.models');

const Adresses = db.define("adresses",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING
    },
    number: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
    
},
{
    timestamps: false,
  }
);

module.exports = Adresses;