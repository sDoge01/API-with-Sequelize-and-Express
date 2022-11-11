const express = require("express");
//Importamos la instancia DB de database.js
const db = require("./utils/database");
const initModels = require('./models/initModels');
const Users = require("./models/users.models");
//const port = 8000;

require('dotenv').config();

const port = process.env.PORT;

initModels();

//Autenticamos con la base de datos:
db.authenticate() //Devuelve una promesa
    .then(()=> console.log("Autenticación exitosa"))
    .catch((err)=> console.log("Hubo un error en la autenticación: ", err))

//Una vez autenticamos, sincronizamos con la base de datos:
db.sync({force: false}) //Devuelve una promesa  
//Force sirve para borrar datos de tablas en caso se modifiquen
    .then(()=> console.log("Sincronizado correctamente"))
    .catch((err)=> console.log("Hubo un error al sincronizar con la Base de Datos ", err))
    //Nuestra app usará express y sus funciones
const app = express()
app.use(express.json());

app.get('/', ()=>{
    res.status(200).json({message: "Alles gut"});
})

/*Esto trae los resultados en json de un SELECT * FROM
Si queremos traer sólamente ciertas columnas, al método findAll() le pasamos un objeto con la propiedad attributes, el cual como valor tendrá un arreglo de strings con los nombres de las columnas ta bom?
{
    attributes: ['id','user_name', 'email']
}

Si en vez de traer columnas, queremos excluir otras, porque nos venga más fácil maybe, pasamos la configuracion siguiente:
{
    attributes: {
        exclude: ['createdAt','updatedAt']
    }
}
*/
app.get('/api/v1/users', async(req, res)=>{
    try {
        const result = await Users.findAll(
            {
                attributes: {
                    exclude: ['createdAt','updatedAt']
                }
            }
        ); //Esto es equivalente a: SELECT * FROM Users
        res.status(200).json(result);
    } catch (error) {
        console.log("Hubo un error al traer a los usuarios: ", error)
    }
});

//Como crear un registro en la DB:
app.post("/api/v1/users", async (req, res) => {
	try {
	  const newUser = req.body;
		const result = await Users.create(newUser);
		res.status(201).json(result);
	} catch (error) {
		console.log(error);
	}
});

//Actualizar registros de la DB:
app.put('/api/v1/users/:idParam', async(req, res)=>{
    try {
        const {idParam} = req.params;
        const data = req.body;
        const result = await Users.update(data,{
            where: {
                id: idParam
            }
        });
        res.status(200).json(result);
    } catch (error) {
        console.log("Hubo un error al actualizar tabla: \n", error)
    }
})

//SELECT * FROM Users WHERE Users.email = 'alvis@gmail.com'

//Esto trae los resultados en json de un SELECT * FROM WHERE
app.get('/api/v1/userEmail/:emailParam', async (req, res) => {
    const { emailParam} = req.params 
    //El nombre del objeto desestructurado, debe ser igual al del parametro
    try {
        const userByEmail = await Users.findOne({
            where: {
                email: emailParam
            }
        });

        res.status(200).json(userByEmail);
    } catch (error) {
        console.log("Hubo un error al realizar la consulta: ", error)
    }
})

/*FindByPk = Realiza un SELECT buscando por la llave primaria de esta manera nos evitamos un where si es que queremos buscar simplemente por el id*/
app.get('/api/v1/userId/:id', async (req,res)=> {
    const {id} = req.params;
    try {
        const result = await Users.findByPk(id);
        res.status(200).json(result)
    } catch (error) {
        console.log("Hubo un error al realizar la consulta: ", error)
    }
})


//DELETE- BORRAR un registro:
app.delete('/api/v1/users/:idDelete', async(req,res)=>{
    try {
        const {idDelete} = req.params;
        const result = await Users.destroy({
            where: {
                id: idDelete
            }
        });
        res.status(204).json(result);
    } catch (error) {
        console.log("Hubo un error al intentar borrar el registro: \n", error)
    }
})

app.listen(port, ()=> console.log("Server running on port ", port))