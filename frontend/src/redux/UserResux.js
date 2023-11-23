//importer createSlice depuis @reduxjs/toolkit, utilisé pour créer la tranche Redux
import { createSlice } from '@reduxjs/toolkit'

//création slice Redux pour la gestion de l'utilisateur
const userSlice = createSlice({
    // Name slice
    name: 'user',
    //état initial
    initialState: {
         //user connecté actuel: (null) car personne n'est connecté au départ
        currentUser: null, 
         //pour signaler un erreur lors de la connexion 
        error: false, 
         //opération en cours de chargement des donées      
        isFetching: false   
    },
    //les actions pour slice user
    reducers: {
        //reducer (action) en cas de succès de la connexion
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;  
            state.error = false;                 
            state.isFetching = false;            
        },

        //reducer (action) en cas d'erreur de connexion
        loginError: (state, action) => {
            state.currentUser = null;            
            state.error = true;                  
            state.isFetching = false;            
        },

        //reducer (action) au début de la connexion
        loginStart: (state, action) => {
            state.currentUser = null;          
            state.error = false;                 
            state.isFetching = true;             
        },

        //reducer (action) pour la déconnexion de user
        logout: (state, action) => {
            state.currentUser = null;            
            state.error = false;                
            state.isFetching = false;           
        }
    }
})

//exportation des actions créées par createSlice
export const { loginStart, loginError, loginSuccess, logout } = userSlice.actions

//exportation du reducer créé par createSlice
export default userSlice.reducer
