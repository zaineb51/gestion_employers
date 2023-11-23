const jwt = require('jsonwebtoken');

 //middleware d'authentification
const verifToken = async (req, res, next) => {
    try {
        //vérifier si token JWT existe dans les en-têtes de la requête
        const token = req.headers["authorization"];
        
        if (!token) {
            return res.status(401).json({
                message: "Aucun token fourni",
                success: false
            });
        }

        //Si le token est valide, décode les informations de user
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Accès non autorisé",
                    success: false,
                    error: err.message 
                });
            }
            
            //ajouter les informations de user décodées à la requête
            req.user = decoded;
            return next();
        });
    } catch (error) {
        //gestion des erreurs inattendues
        console.error("Erreur d'authentification :", error);
        return res.status(500).json({
            message: "Erreur interne du serveur",
            success: false,
            error: error.message
        });
    }
};

module.exports = verifToken;
