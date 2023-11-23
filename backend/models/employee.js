const mongoose = require('mongoose');

// Définition du schéma pour le modèle de employee à l'aide de Mongoose
const employeeSchema = new mongoose.Schema({

    //Les propriétés du schéma 
    employeeName : {
        type : String,
        required : true
    },
    genre : {
       type : String,
       required : true
   },
   dateOfBirth : {
        type : Date,
        required : true
   },
    phone: {
        type : Number,
        required : true,
        //unique : true
    },
    hireDate : {
        type : Date,
        required :true
    },
    typeOfContract : {
       type : String,
       required : true
    },
    Salary : {
        type : String,
        required : true
    },
    photo: {
        type: String,
        required : true
      },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
      },
})
//création du modèle Mongoose pour le schéma d'employé
module.exports=mongoose.model('Employee',employeeSchema)