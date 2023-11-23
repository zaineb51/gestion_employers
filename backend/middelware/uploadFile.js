//importation multer pour gérer des fichiers uploadés
const multer = require("multer");

//configuration de multer pour définir où enregistrer les fichiers et comment les nommer
const storage = multer.diskStorage({
  //destination de l'enregistrement des fichiers
  destination: function (req, file, cb) {
    cb(null, './storages/'); 
  },
  //nom de fichier personnalisé
  filename: function (req, file, cb) {
    //ajout d'un suffixe unique au nom de fichier pour éviter les doublons
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    //appel callbach avec le nom de fichier personnalisé
    cb(null, file.originalname  );
  }
});

//configuration de multer avec les options de stockage et de filtrage des fichiers
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    //diltrage des fichiers pour accepter uniquement les images de type png, jpeg et jpg
    if (file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg") {
        //fichier accepté
      cb(null, true); 
    } else {
      cb(new Error("Fichier incompatible")); 
    }
  }
});


module.exports = upload;
