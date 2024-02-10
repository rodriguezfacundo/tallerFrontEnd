import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading:false,
    alimentos: [],
    error: '' ,
}

export const obtenerAlimentos = createAsyncThunk(
    'alimentos/obtenerAlimentos',
    async(credenciales) =>{
        console.log('data que llega al getAlimentos', credenciales)
        const request = await axios.get(
            'https://calcount.develotion.com/alimentos.php',
            {
              headers: {
                'Content-Type': 'application/json',
                'apikey': credenciales.apiKey,
                'iduser': credenciales.idUsuario,
              },
            }
          );
        const respuesta = await request.data.alimentos;
        console.log('respuesta obtener alimentos', respuesta);
        return respuesta;
})

const alimentoSlice = createSlice({
    name: 'alimentos',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(obtenerAlimentos.pending, (state) =>{
            state.loading = true;
        })
        builder.addCase(obtenerAlimentos.fulfilled, (state, action) =>{
            state.loading = false;
            state.alimentos = action.payload;
            state.error = '';
        })
        builder.addCase(obtenerAlimentos.rejected, (state, action) =>{
            state.loading = false;
            state.alimentos = [];
            state.error = action.error.message;
        })
    }
})

export default alimentoSlice.reducer