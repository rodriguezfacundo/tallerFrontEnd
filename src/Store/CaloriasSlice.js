import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    calorias: 0,
}

const CaloriasSlice = createSlice({
    name: "calorias",
    initialState,
    reducers: {
        cargarCalorias: (state, action) => {
            const calIni = action.payload
            state.calorias = calIni
        },
        bajaCalorias: (state, action) => {
            const calIni = action.payload
            state.calorias = calIni
        }
    }
});
export const { cargarCalorias, bajaCalorias } = CaloriasSlice.calorias;
export default CaloriasSlice.reducer