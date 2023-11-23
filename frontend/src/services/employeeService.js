//importation de l'instance axios configurée depuis le fichier axiosContext
import http from "./axiosContext";

//fonction pour créer une nouvelle employee en utilisant une requête HTTP POST
const create = (data) => {
    return http.post("/employee/addEmployee", data);
}

//fonction pour afficher la liste des employés en utilisant une requête HTTP GET
const getall = () =>{
    return http.get("/employee/listEmployees")
}
//fonction pour afficher un employé en utilisant une requête HTTP GET
const getOne = (id) =>{
    return http.get(`/employee/getEmployee/${id}`)
}
//fonction pour modifier un employé en utilisant une requête HTTP PUT
const update =(id, data) =>{
    return  http.put(`/employee/update/${id}`,data)
}
//fonction pour supprimer un employé en utilisant une requête HTTP DELETE
const deleteOne = (id)=>{
    return http.delete(`/employee/delete/${id}`)
}

//exporter l'objet contenant les fonctions
export default {
    create, getOne, getall, deleteOne, update
};