const mongoose = require('mongoose');

// Définition du schéma pour le modèle de département à l'aide de Mongoose
const departmentSchema = new mongoose.Schema({

// Les propriétés du schéma 
nameDepartment : {
    type : String,
    required : true
},
description : {
    type : String,
    required : true
},
employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  }],

})

//création du modèle Mongoose pour le schéma de Département
module.exports=mongoose.model('Department',departmentSchema)
