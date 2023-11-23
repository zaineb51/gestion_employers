//création d'une instance de routeur express
const route = require("express").Router()

//importer les fonctions du contrôleur departmentController
const departmentController = require('../controllers/departmentController')

//défini une route POST pour l'ajout d'un département en utilisant la fonction create
route.post('/add', departmentController.create)

//défini une route GET pour l'affichage de la liste des départements en utilisant la fonction getAll
route.get('/getall', departmentController.getAll)

//défini une route GET pour l'affichage d'un département en utilisant la fonction getOneById
route.get('/get/:id', departmentController.getOneById)

//défini une route PUT pour modifier un département en utilisant la fonction update
route.put('/update/:id', departmentController.update)

//défini une route DELETE pour supprimer un département en utilisant la fonction deleteEmployee
route.delete('/delete/:id', departmentController.deleteDepartment)

//exporté l'instance du routeur Express
module.exports=route
