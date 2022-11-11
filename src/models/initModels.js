//Primero primerisimo importamos los modelos:
const Users = require('./users.models');
const Tasks = require('./tasks.models');
const Categories = require('./categories.models');
const Tasks_categories = require('./tasks_categories.models');
const Adresses = require('./adresses.models');


function initModels(){
    // relación 1 - 1 entre direcciones y usuarios
	Adresses.belongsTo(Users, { as: "resident", foreignKey: "user_id" });
    Users.hasOne(Adresses, { ass: "home", foreignKey: "user_id" });

    //Relacion 1 a muchos entre tareas  y usuarios:
    Tasks.belongsTo(Users, {alias: "author", foreignKey: "user_id"});
    Users.hasMany(Tasks, {alias: "toDos", foreignKey: "user_id"});

    /* Relación de muchos a muchos:
    La relacion de muchos a muchos la vamos a construir con dos relaciones 
    de uno a muchos */

    //Entre Tasks - Task Categories:
    Tasks_categories.belongsTo(Tasks, {as: 'todo', foreignKey: "task_id"});
    Tasks.hasMany(Tasks_categories, {as: 'categories', foreignKey: "task_id"});

    //Entre Task Categories - Categories
    Tasks_categories.belongsTo(Categories, {as: 'categories', foreignKey: "category_id"});
    Categories.hasMany(Tasks_categories, {as: 'todos', foreignKey: "category_id"});

}

module.exports = initModels;