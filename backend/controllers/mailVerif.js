const {join} = require("path");
const nodemailer = require("nodemailer");
const user = require("../models/userModel");
const URL = process.env.URL;

//configuration du transporteur Nodemailer pour l'envoi d'e-mails
var transport = nodemailer.createTransport({
    //spécification de l'hôte du serveur SMTP
    host: "sandbox.smtp.mailtrap.io",
    //spécification du numéro de port pour la connexion SMTP
    port: 2525,
    auth: {
        //nom d'utilisateur pour l'authentification
        user: "9d056b85673da5",
           //mot_de_passe pour l'authentification
        pass: "822368ce3b2d2c"
    }
});

  module.exports = {
    mail_verif: (item) => {
        transport.sendMail({
            from: "user@test.com",
            to: item.email,
            subject: `hello ${item.__t} ${item.name}`,
            html: `<a href="${URL}/verify/${item.codeverify}"> verify </a>`,
          });
    },
    forget: (name,email,token) => {
      transport.sendMail({
        from: "user@test.com",
        to: email,
        subject: `hello ${name}`,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Vérifiez votre compte</h1>
            <a href="http://localhost:8080/auth/verify/${user.codeverify}">Cliquez ici</a>
        </body>
        </html>`
      });
    },
   //fonction asynchrone pour vérifier et valider le code de vérification de l'utilisateur :codeverify
verifierCode : (async (req, res) => {
    try {
        //rechercher user qui utilise codeverify fourni dans les paramètres de la requête
        const UserVerif = await user.findOne({ codeverify: req.params.codeverify });

        //réinitialiser codeverify
        UserVerif.codeVerify = undefined; 
        //marquer l'utilisateur comme vérifié 
        UserVerif.verified = true;  
        //sauvegarder les modifications dans la base de données
        UserVerif.save();  

        //envoyer un fichier HTML indiquant le succès de la vérification
        return res.sendFile(join(__dirname + '../../templates/success.html'));
    } catch (error) {
        //en cas d'erreur renvoie un fichier HTML indiquant l'échec de la vérification
        return res.sendFile(join(__dirname + '../../templates/error.html'));
    }
})
  }
