//importer les fcts nécessaires de @reduxjs/toolkit pour configurer le store Redux
import { configureStore, combineReducers } from '@reduxjs/toolkit'

//importer le slice 
import userReducer from './UserResux'

//importe les fcts de redux-persist
import storage from 'redux-persist/lib/storage' 
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

//configurer la persistance avec redux-persist
const persistConfig = {
    //clé  pour identifier le stockage persistant
  key: 'root', 
   //version du store    
  version: 1, 
  //type de stockage (localStorage et sessionStorage)      
  storage,          
}

//créer  reducer persistant en utilisant redux-persist
const persistedReducer = persistReducer(persistConfig, userReducer);

//configuration du store Redux avec reducer persistant
export const store = configureStore({
    //utiliser reducer persistant
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //configuration pour ignorer des actions lors de la sérialisation
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//création d'un persistor pour gérer la persistance des données
export let persistor = persistStore(store);