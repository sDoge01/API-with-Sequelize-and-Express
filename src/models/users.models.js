//Primero importamos la base de datos:
const db = require('../utils/database');

//Importantísimo: Los DataTypes de sequelize para las propiedades de las columnas:
const { DataTypes } = require('sequelize')

//Creamos el MODELO de Users:

//Define acepta dos parámetros:
//1- Un string, nombre de la tabla
//2- Un objeto con las columnas de la tabla
const Users = db.define("users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true //Este objeto de 'validate' verifica que se valide ciertos campos a través de la propiedad que indicamos
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
);

module.exports = Users;