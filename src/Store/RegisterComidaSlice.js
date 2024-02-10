import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const comidaRegister = createAsyncThunk(
    'comida/comidaRegister',
    async(credenciales) =>{
        console.log('data que llega al post', credenciales)
        const request = await axios.post(
            'https://calcount.develotion.com/registros.php',
            {
              'idAlimento':credenciales.idAlimento,
              'idUsuario': credenciales.idUsuario,
              'cantidad': credenciales.cantidad,
              'fecha': credenciales.fecha,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'apikey': credenciales.apiKey,
                'iduser': credenciales.idUsuario,
              },
            }
          );
        const respuesta = await request.data;
        console.log('respuesta', respuesta);
        return respuesta;

    }
);

const comidaRegisterSlice = createSlice({
    name: 'comidaRegister',
    initialState:{
        loading: false,
        comida: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(comidaRegister.pending, (state)=>{
                state.loading = true;
                state.comida = null;
                state.error = null;
            })
            .addCase(comidaRegister.fulfilled,(state, action) =>{
                state.loading = false;
                state.comida = action.payload;
                state.error = null;
            })
            .addCase(comidaRegister.rejected, (state, action)=>{
                state.loading = false;
                state.comida = null;
                if(action.error.message === 'Request failed with status code 401'){
                    state.error = "API Key o usuario inválido";
                    console.log(state.error)
                } else {
                    state.error = action.error.message;
                }
            })
    }
})
export default comidaRegisterSlice.reducer;
