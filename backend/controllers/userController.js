const user = require('../models/userModel')
const bcrypt = require("bcrypt")
//importation du module jsonwebtoken
const jwt = require("jsonwebtoken")
const { join } = require("path")
const {forget} = require('./mailVerif')
const crypto = require('crypto')
const URL = process.env.URL
//importation du module joi
const Joi = require("joi");


// Génération du code avec la fonction randomBytes dans la bibliothèque crypto
const { randomBytes } = require("crypto");

//fonction pour register user
const register = async (req, res) => {
  let userConnect;
  try {
    // Validation des données avec Joi
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(6).max(255).required(),
    });

    const { error, value } = schema.validate(req.body);

    //gestion des erreurs de validation
    if (error) {
      console.error("Erreur de validation :", error.details.map(d => d.message).join(", "));
    } else {
      console.log("Données valides :", value);
    }

    //génération d'un salt pour le hachage du mot de passe avec bcrypt, et rendre les attaques par force brute plus difficiles (10 itérations de hachage).
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    //création d'un nouvel admin avec le modèle admin
    const newUser = new user({
      ...req.body,
      password: hashpassword,
      //générer une chaîne hexadécimale aléatoire de 6 octets
      codeverify: randomBytes(6).toString("hex"),
      //au lieu de req.body, et les ... pour le reste des attributs
    });

    //sauvegarde user dans la base de données
    userConnect = await newUser.save((error, item) => {
      //gestion des erreurs lors de la sauvegarde
      if (error) {
        res.status(400).json({
          error: message.error,
        });
      } else {
        //envoi de l'e-mail de confirmation avec Nodemailer
        mail_verif(item);

        //réponse JSON indiquant le succès
        res.status(201).json({
          message: "User created",
          data: item,
        });
      }
    });
  } catch (error) {
    //gestion des erreurs lors de l'exécution du code
    res.status(500).json({
      error: error.message,
    });
  }
};



//importer keys declaré en .env
const accessKey = process.env.rtoken;
const refreshKey = process.env.srtoken;

//tableau pour stocker les jetons de rafraîchissement pour suivre les quels sont actifs, afin de pouvoir les gérer ultérieurement
let refreshTokens = [];

//fonction pour générer un jeton d'accès (access token)
const generateAccessToken = (user) => {
    //utiliser la bibliothèque jsonwebtoken pour signer un jeton d'accès
    //les informations du payload incluent l'identifiant de l'utilisateur (user.id)
    //accessKey est utilisée pour la signature
    //le jeton d'accès expire après 30 minutes
    token = jwt.sign({ id: user.id }, accessKey, { expiresIn: "1m" });
    return token;
}

//fonction pour générer un jeton de rafraîchissement (refresh token)
const generateRefreshToken = (user) => {
    //utiliser la bibliothèque jsonwebtoken pour signer un jeton de rafraîchissement
    //les informations du payload incluent l'identifiant de l'utilisateur (user.id)
    //refreshKey est utilisée pour la signature
    //le jeton de rafraîchissement expire après 60 minutes
    token = jwt.sign({ id: user.id }, refreshKey, { expiresIn: "60m" });
    return token;
}

const  login = async (req, res) => {
    try {
      const user = await user.findOne({ email: req.body.email });
      if (user) {

    //comparer le mot de passe fourni avec le mot de passe haché stocké dans la base de données
        const cmp = await bcrypt.compare(req.body.password, user.password);
        if (cmp) {

        //générer les jetons d'accès et de rafraîchissement pour user authentifié
        const access_Token = generateAccessToken(user)
        const refresh_Token = generateRefreshToken(user)

        //ajouter le jeton de refraîchissement à la liste des jetons actifs
          refreshTokens.push(refresh_Token);
          const userLog = await user.findOne({ email: req.body.email }).select("-password");
          res.status(200).json({
            message: "auth successful",
            success: true,
            data: userLog,
            //affichage des jetons dans la réponse pour une utilisation côté client:
            //accessToken qui sera utilisé pour les requêtes authentifiées
            accessToken: access_Token,
            //refreshToken pour obtenir de nouveaux accessToken
            refreshToken: refresh_Token,
            
          });
        } else {
          res.status(404).json({
            message: "Wrong username or password",
            success: false,
          });
        }
      } else {
        res.status(404).json({
          message: "Wrong username or password.",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occurred");
    }
  };
  
//fonction pour gérer la déconnexion d'un utilisateur en révoquant refreshtoken
const logout = async (req, res) => {
    try {
      let refreshtoken = req.body.refresh_token;
      refreshTokens = refreshTokens.filter((token) => token != refreshtoken);
      console.log("after logout :", refreshTokens);
      res.send("logged out");
    } catch (error){
      res.send({message:error.message});
      console.log(error);
    }
  };



//fonction asynchrone pour gérer la demande de réinitialisation de mot de passe
const forgetPass = (async (req, res) => {
    try {
        // Récupérer l'e-mail depuis le corps de la requête
        const email = req.body.email;

         //recherche de l'utilisateur associé à l'adresse e-mail dans la base de données
        const User = await user.findOne({ email })
         //vérifier si l'utilisateur existe
        if (!User) {
            res.status(400).json({
                message: "user not found"
            })
        }
      // Générer un token de réinitialisation de mot de passe avec une expiration de 2 heures
        const token = jwt.sign({ _id: User._id }, accessKey, { expiresIn: "2h" });

     //mettre à jour le champ resetpass de l'utilisateur avec le nouveau token
        await user.findOneAndUpdate(
            { email: email },
            { resetpass: token }
        );
        transport.sendMail({
            from: "admin@gmail.com",
            to: User.email,
            subject: "Forgot Passsword" + User.name,
            text: "mail de confirmation",
            html: `<!DOCTYPE html>
            <html lang="en">
            
            <body>
                <h1>Reset Password</h1>
                <a href="http://localhost:3000/auth/resetpassword/${token}">click here to reset your password</a>
            </body>
            </html>`}, (err, info) => {
            if (err) {
                console.log("error", err);
            } else {
                console.log("email sent:", info);
            }
        });
        res.status(201).json({
            success: true,
            message: "check your email",
            data: User,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "failed register admin" + error,
        });
    }


})

//fonction asynchrone pour réinitialiser le mot de passe de l'utilisateur
const resetPass = (async (req, res) => {

    try {
      //vérifier le token de réinitialisation à l'aide accessKey
        jwt.verify(req.params.token, accessKey, async (err) => {
            if (err) {
                return res.status(404).json({ message: "token expireddddd" });
            }
            //recherche de l'utilisateur en utilisant le token de réinitialisation dans la base de données
            const User = await user.findOne({ resetpass: req.params.token});
            console.log(User);

            //générer un nouveau salt et hachage du nouveau mot de passe
            const salt=await bcrypt.genSalt(10)
            const newPassword=await bcrypt.hash(req.body.password,salt)

            //mise à jour du mot de passe et du champ resetpass de l'utilisateur
            User.password=newPassword
            User.resetPass=undefined;
            //sauvegarder les modifications dans la base de données
            User.save();
            res.status(200).json({ message: "password Updated" });
        });

    
   } catch (error) {
    res.status(400).json({ message: error.message });
}

})

const fetchUser = async (req, res) => {
    try {
      const newUser = await user.findById(req.params.id);
      res.status(200).json({
        message: "user fetched",
        success : true,
        user: newUser
      })
    } catch (error) {
      res.status(400).json({
        message: "failed to get user",
        success: false,
      })
    }
  }

module.exports =({register, login, logout, forgetPass, resetPass, fetchUser});