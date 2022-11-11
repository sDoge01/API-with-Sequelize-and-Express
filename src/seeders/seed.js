const Adresses = require("../models/adresses.models");
const Categories = require("../models/categories.models");
const Tasks = require("../models/tasks.models");
const Tasks_categories = require("../models/tasks_categories.models");
const Users = require("../models/users.models");
const initModel = require("../models/initModels");
const db = require("../utils/database");

initModel();

const users = [
    { user_name: "Ian Rosas", email: "ian@gmail.com", password: "1234" },
    { user_name: "Alvis Echeverria", email: "alvis@gmail.com", password: "1234" },
    { user_name: "Carlos Tineo", email: "carlos@gmail.com", password: "1234" },
  ];

  const tasks = [
    {
      title: "Crear seeders",
      description: "Terminar el archivo para los seeders",
      user_id: 1,
    },
    {
      title: "Pasear al perro",
      description: "Darle la vuelta por todo el barrio a firulais",
      user_id: 2,
    },
    {
      title: "Tomar dos litros de agua",
      user_id: 3,
    },
  ];

  const adresses = [
    { street: "Buena Vista", number: 157, user_id: 1 },
    { street: "Benito Juarez", number: 28, user_id: 2 },
    { street: "Madero", number: 185, user_id: 3 },
  ];

  const categories = [
    { name: "personal" }, // 1
    { name: "escuela" }, // 2
    { name: "salud" }, // 3
    { name: "trabajo" }, // 4
    { name: "hogar" }, // 5
    { name: "deporte" }, // 6
    { name: "ocio" }, // 7
    { name: "financiero" }, // 8
  ];

  const tc = [
    { taskId: 1, categoryId: 1 },
    { taskId: 1, categoryId: 2 },
    { taskId: 1, categoryId: 4 },
    { taskId: 2, categoryId: 1 },
    { taskId: 2, categoryId: 3 },
    { taskId: 2, categoryId: 6 },
    { taskId: 2, categoryId: 7 },
    { taskId: 3, categoryId: 1 },
    { taskId: 3, categoryId: 3 },
  ];

  db.sync({ force: true })
  .then(() => {     //Una vez sincronizamos las tablas, procedemos a insertar los valores
		console.log("Iniciando la plantación de Información");
        // Así es como insertamos datos en la base de datos
		users.forEach((user) => Users.create(user));

        //Lo siguiente, es esperar un tiempo para que primero se inserten los usuarios, luego las tareas, ya que estas contienen llaves foráneas de los usuarios
        setTimeout(() => {
			tasks.forEach((task) => Tasks.create(task));
		}, 100);

        //Y la misma técnica con las demás tablas:
        setTimeout(() => {
			adresses.forEach((address) => Adresses.create(address));
		}, 200);

        setTimeout(() => {
			categories.forEach((category) => Categories.create(category));
		}, 300);

        setTimeout(() => {
			tc.forEach((tc) => Tasks_categories.create(tc));
		}, 400);
	})
	.catch((error) => console.log(error));