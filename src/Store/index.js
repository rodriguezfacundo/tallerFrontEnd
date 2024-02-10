import {configureStore} from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import registerReducer from './RegisterSlice';
import registerComida from './RegisterComidaSlice';
import obtenerAlimentos from './ObtenerAlimentosSlice';
import ObtenerRegistrosComidas from "../Store/ObtenerRegistrosComidasSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
        register: registerReducer,
        registerComida: registerComida,
        alimentos: obtenerAlimentos,
        registros: ObtenerRegistrosComidas,
    }
});
export default store;