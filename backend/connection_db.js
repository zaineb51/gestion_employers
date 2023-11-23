const mongoose = require("mongoose");
const DB = "mongodb://127.0.0.1:27017/gestionRH";

//connexion à la base de donnée MongoDB en utilisant mongoose
const connectToDB = async () => {
  mongoose.connect(DB, { useNewUrlParser: true });
  console.log("data base connected successfuly");
};
module.exports = connectToDB;