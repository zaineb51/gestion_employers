const userAuth = require('../controllers/userController');
const auth = require('../middelware/AuthToken');
const route = require('express').Router();

//route register
route.post('/register',userAuth.register)

//route de connexion
route.post('/login',userAuth.login);

//route de déconnexion
route.get('/logout',userAuth.logout);

//route utilisé pour initier le processus de récupération de mot de passe
route.post('/forgetPass',userAuth.forgetPass);

//route de réinitialisation de mot de passe 
route.post('/resetPass',userAuth.resetPass);

//route pour la récupération des informations du profil de user authentifié
route.get('/profileUser/:id',auth,userAuth.fetchUser);

//exporté l'instance du routeur Express
module.exports=route