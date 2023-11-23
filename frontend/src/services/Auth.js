//importation de l'instance axios configurée depuis le fichier axiosContext
import http from "./axiosContext";

const register = (data)=>{
    return http.post("/register", data)
}

const login =(data)=>{
    return http.post("/login", data)
}

const profile = (id)=>{
    return http.get(`/profileUser/${id}`)
}

const logout =()=>{
    return http.get("/logout")
}
const forgotPassword = (data)=>{
    return http.post("/forgetPass", data)
}

const resetPassword = (token)=>{
    http.post(`/resetPass/${token}`)
}
export default {register, login, logout, forgotPassword, resetPassword, profile}