import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading:false,
    registros: [],
    error: '' ,
}

export const obtenerRegistrosComida = createAsyncThunk(
    'comidas/obtenerRegistrosComida',
    async(credenciales) =>{
        const request = await axios.get(
            `https://calcount.develotion.com/registros.php?idUsuario=${credenciales.idUsuario}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'apikey': credenciales.apiKey,
                'iduser': credenciales.idUsuario,
              },
            }
          );
        const respuesta = await request.data.registros;
        console.log('respuesta obtener registros', respuesta);
        return respuesta;
})

const registrosSlice = createSlice({
    name: 'registros',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(obtenerRegistrosComida.pending, (state) =>{
            state.loading = true;
        })
        builder.addCase(obtenerRegistrosComida.fulfilled, (state, action) =>{
            state.loading = false;
            state.registros = action.payload;
            state.error = '';
        })
        builder.addCase(obtenerRegistrosComida.rejected, (state, action) =>{
            state.loading = false;
            state.registros = [];
            state.error = action.error.message;
        })
    }
})

export default registrosSlice.reducer