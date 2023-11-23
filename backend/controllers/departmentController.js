const departmentModel = require("../models/department");
//importation du module joi
const Joi = require("joi");

//la fonction create d'un département
const create = async (req, res) => {
  let department;
  try {
    //définition du schéma de validation avec Joi
    const departmentSchema = Joi.object({
      nameDepartment: Joi.string().min(2).required(),
      description: Joi.string().min(5).required(),
    });

    // Validation des données par rapport au schéma
    const { error, value } = departmentSchema.validate(req.body);

    //gestion des erreurs de validation
    if (error) {
      console.error(
        "Erreur de validation :",
        error.details.map((d) => d.message).join(", ")
      );
    } else {
      console.log("Données valides :", value);
    }

    //création d'un nouvel objet ManagerRH avec les données validées
    const newDepartment = new departmentModel(req.body);

    //sauvegarde du nouvel department dans la base de données
    department = await newDepartment.save();

    //envoie la réponse sur le status HTTP 201 si le nouvel département crée
    res.status(201).json({ message: "department created", data: department });
  } catch (error) {
    //s'il y'a un erreur, l'envoie sur le status HTTP 500
    res.status(500).json({ error: "error" });
  }
};

//modifier un département selon ID
const update = async (req, res) => {
  try {

     //définir le schéma de validation avec Joi 
     const departmentUpdateSchema = Joi.object({
      nameDepartment: Joi.string().min(2),
      description: Joi.string().min(5),
    });

    // Validation des données par rapport au schéma
    const { error, value } = departmentUpdateSchema.validate(req.body);

    // Gestion des erreurs de validation
    if (error) {
      return res.status(400).json({ error: error.details.map(d => d.message).join(", ") });
    }
    
    const department = await departmentModel.updateOne(
      { _id: req.params.id },
      value
    );
    res.status(200).json({
      message: "department updated",
      data: department,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

//la fonction get listDepartment
const getAll = async (req, res) => {
  try {
    //récupérer la liste des départements depuis la base de données
    const departments = await departmentModel.find();
    res.status(200).json({
      message: "list of departments",
      data: departments,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//la fonction get d'un department selon departmentId
const getOneById = async (req, res) => {
  try {
    const department = await departmentModel.findById({ _id: req.params.id });
    res.status(200).json({ data: department });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//la fonction delete pour supprimer un département
const deleteDepartment = async (req, res) => {
  try {
    const department = await departmentModel.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "department removed" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { create, update, getAll, getOneById, deleteDepartment };
