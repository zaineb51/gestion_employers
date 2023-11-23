//création d'une instance de routeur express
const route = require("express").Router()

const upload = require('../middelware/uploadFile');

//importer les fonctions du contrôleur employeeController
const employeeController = require('../controllers/employeeController')

//défini une route POST pour l'ajout d'un employé en utilisant la fonction create
route.post('/addEmployee',upload.single("photo"), employeeController.create)

//défini une route GET pour l'affichage de la liste d'employé en utilisant la fonction getAll
route.get('/listEmployees', employeeController.getAll)

//défini une route GET pour l'affichage d'un employé en utilisant la fonction getOneById
route.get('/getEmployee/:id', employeeController.getOneById)

//défini une route PUT pour modifier un employé en utilisant la fonction update
route.put('/update/:id',upload.single("photo"), employeeController.update)

//défini une route DELETE pour supprimer un employé en utilisant la fonction deleteEmployee
route.delete('/delete/:id', employeeController.deleteEmployee)

//exporté l'instance du routeur Express
module.exports=route
