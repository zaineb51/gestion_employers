const employeeModel = require("../models/employee");
const departmentModel = require("../models/department");
//importation du module joi
const Joi = require("joi");



//la fonction create pour ajouter un employé 
const create = async (req, res) => {
  let employee;
  try {
    //utiliser la méthode lean() pour convertir le résultat en objet JavaScript
    const department = await departmentModel.findById(req.body.department).lean();

    //vérifier l'existence du département
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
      // Validation des données avec Joi
      const employeeSchema = Joi.object({
        employeeName: Joi.string().min(2).required(),
        genre: Joi.string().valid('Féminin', 'Masculin').required(),
        dateOfBirth: Joi.date().iso().required(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
        salary: Joi.number().min(0).required(),
        typeOfContract: Joi.string().valid('CDI', 'CDD', 'Stage').required(),
        hireDate: Joi.date().iso().required()
      });
    

    const { error, value } = employeeSchema.validate(req.body);

    //gestion des erreurs de validation
    if (error) {
      console.error("Erreur de validation :", error.details.map(d => d.message).join(", "));
    } else {
      console.log("Données valides :", value);
    }

    //ajout du chemin de l'image dans la requête
    req.body.photo = req.file?.path;

    //création d'un nouvel  employee avec les données validées
    const newEmployee = new employeeModel(req.body);

    //sauvegarde du nouvel employee dans la base de données
    employee = await newEmployee.save();

    //ajouter l'ID de l'employé au tableau d'employés du département
    department.employees.push(employee._id);

    // Mettre à jour le modéle du department avec le nouvel IDEmployee
    await departmentModel.findByIdAndUpdate(department._id, { employees: department.employees });

    //envoie la réponse sur le statut HTTP 201 si le nouvel employé est créé
    res.status(201).json({ message: 'Employee created', employee });
  } catch (error) {
    //s'il y a un erreur, l'envoie sur le statut HTTP 400
    res.status(400).json({error: error.message });
  };
};



//modifier un employé selon ID
// const update = async (req, res) => {
//   try {
//       // Validation des données avec Joi
//       const employeeSchema = Joi.object({
//         employeeName: Joi.string().min(2).required(),
//         genre: Joi.string().valid('Féminin', 'Masculin').required(),
//         dateOfBirth: Joi.date().iso().required(),
//         phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
//         salary: Joi.number().min(0).required(),
//         typeOfContract: Joi.string().valid('CDI', 'CDD', 'Stage').required(),
//         hireDate: Joi.date().iso().required()
//       });
    

//     const { error, value } = employeeSchema.validate(req.body);

//     //gestion des erreurs de validation
//     if (error) {
//       res.status(404).json({error:error.message})
//     } 
     
//     //ajout du chemin de photo dans la requête
//     req.body.photo = req.file.path;

//     const employee = await employeeModel.updateOne(
//       { _id: req.params.id },
//      req.body
//     );
//     res.status(200).json({
//       message: "employee updated",
//       data: employee,
//     });
//   } catch (error) {
//     res.status(400).json({
//       error,
//     });
//   }
// };



const update = async (req, res) => {
  try {
    //trouver l'employé à mettre à jour en utilisant l'ID d'employé
    const emp = await employeeModel.findOne({ _id: req.params.id });

    //vérifier s'il y a des fichiers dans la requête
    const file = req.files ? req.files[0] : null;

    // Si oui, mettre à jour le champ photo d'employé
    if (file) {
      req.body["photo"] 
    }

    //mettre à jour l'employé avec les données fournies dans req.body
    const employee = await emp.updateOne({ _id: req.params.id }, req.body);

    //envoyer une réponse JSON indiquant que la mise à jour a été effectuée avec succès
    res.status(200).json({
      message: "Employee updated",
      success: true,
      data: employee,
    });
  } catch (error) {
    //sinon envoyer une réponse JSON indiquant que la mise à jour a échoué
    res.status(400).json({
      message: "Employee update failed",
      success: false,
      error: error,
    });
  }
}








//la fonction get listEmployee
const getAll = async (req, res) => {
  try {
    //récupérer la liste d'employés depuis la base de données et populer la référence au département
    const employees = await employeeModel.find().populate("department");
    res.status(200).json({
      message: "list of employees",
      data: employees,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

//la fonction get d'un employé selon employeeId
const getOneById = async (req, res) => {
  try {
    const employee = await employeeModel.findById({ _id: req.params.id }).populate("department");
    res.status(200).json({ data: employee });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//la fonction delete pour supprimer un employé
const deleteEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.deleteOne({ _id: req.params.id });
    await departmentModel.findByIdAndUpdate(employeeModel.departmentModel, {
      $pull: { employees: employee._id },
    });
    res.status(200).json({ message: "employee removed" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { create, update, getAll, getOneById, deleteEmployee };
