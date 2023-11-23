//importation du module axios depuis la bibliothèque "axios"
import axios from "axios"

//création d'une instance axios configuré avec url pour communiquer les APIs
export default axios.create({
    baseURL:"http://localhost:5000"
    
})
