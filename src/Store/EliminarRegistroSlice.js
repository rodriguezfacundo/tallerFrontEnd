import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading:false,
    registroEliminado: '',
    error: '' ,
}

export const eliminarRegistro = createAsyncThunk(
    'registros/eliminar',
    async(credenciales) =>{
        console.log('data que llega al eliminar Registro', credenciales)
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

const eliminarSlice = createSlice({
    name: 'eliminarRegistro',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(eliminarRegistro.pending, (state) =>{
            state.loading = true;
        })
        builder.addCase(eliminarRegistro.fulfilled, (state, action) =>{
            state.loading = false;
            state.registroEliminado = action.payload;
            state.error = '';
        })
        builder.addCase(eliminarRegistro.rejected, (state, action) =>{
            state.loading = false;
            state.registroEliminado = '';
            state.error = action.error.message;
        })
    }
})

export default eliminarSlice.reducer