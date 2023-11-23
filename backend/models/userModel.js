const mongoose = require('mongoose');

//schéma de base pour user
const userSchema = new mongoose.Schema({
    //champ pour le nom de user
    name: {
        type: String
    },

    //champ pour l'adresse e-mail de user
    email: {
        type: String,
        required: true,
        unique: true
    },
    //champ pour le mot de passe de user
    password: {
        type: String,
        required: true,
        unique: true
    },
    //champ pour le réinitialisation du mot de passe de user 
    resetPass: {
        type: String
    }
});

// Exporter le modèle
module.exports= mongoose.model('User', userSchema);

