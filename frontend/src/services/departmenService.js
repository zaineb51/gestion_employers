//importation de l'instance axios configurée depuis le fichier axiosContext
import http from "./axiosContext";

//fonction pour créer un nouvel département en utilisant une requête HTTP POST
const create = (data) => {
    return http.post("/department/add", data);
};

//fonction pour afficher la liste des départements en utilisant une requête HTTP GET
const getall = () =>{
    return http.get("/department/getall")
}
//fonction pour afficher un département en utilisant une requête HTTP GET
const depabyId = (id) =>{
    return http.get(`/department/get/${id}`)
}
//fonction pour modifier un département en utilisant une requête HTTP PUT
const update = (id, data) =>{
    return  http.put(`/department/update/${id}`,data)
}
//fonction pour supprimer un département en utilisant une requête HTTP DELETE
const deleteOne = (id)=>{
    return http.delete(`/department/delete/${id}`)
}

//exporter l'objet contenant les fonctions
export default {
    create, depabyId, getall,  update, deleteOne
};