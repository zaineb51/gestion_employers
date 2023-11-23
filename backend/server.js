//importer l'Express pour faciliter le développement de l'application, côté route et requête HTTP
const express = require("express");

//importer cors, c'est le middleware Express
const cors=require("cors")
//configure dotenv pour accéder les variables dans le fichier .env
//const env=require("dotenv").config();

//importer le module path pour indiquer les chemins de fichiers
const path = require("path")

//création d'instance d'express
const app = express();

const routeEmployee = require('./routes/employeeRoute')
const routeDepartment = require('./routes/departmentRoute')
const userRouter = require('./routes/userRouter')
const mailVerify = require('./controllers/mailVerif')

//activer cors pour le partage d'une ressource de l'API REST dans app
app.use(cors())

//la fonction express.json() traite automatiquement la requête au format JSON
app.use(express.json())

app.use('/employee', routeEmployee);
app.use('/department', routeDepartment);
app.use('/',userRouter)
app.use('/verify/:code',mailVerify.verifierCode)

//définir la route GET qui répond aux requêtes avec req.params :photo
app.get("/:photo", (req, res) => {
    //utiliser res.sendFile pour envoyer le fichier
    //construire le chemin du fichier avec l'utilisation path.join
   res.sendFile(__dirname+"storages"+req.params.photo)
});

//const port = process.env.PORT || 3080;
port = 5000;
const connectToDB = require("./connection_db");
connectToDB();

//définie une route par défaut
app.get("/", (req, res) => {
  res.send("Hello World!");
});
//lorsque le serveur est démarré, un message 'server connected' affiche dans la console
app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});
