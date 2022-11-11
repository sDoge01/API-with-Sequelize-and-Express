require("dotenv").config(); //Traemos las variables de entorno
//Esto es para gestionar conexión a la base de datos:

const { Sequelize } = require("sequelize");

const db = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    dialect: "postgres"
});

module.exports = db;