import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const comidaRegister = createAsyncThunk(
    'comida/comidaRegister',
    async(idAlimento, idUsuario, cantidad, fecha, apiKey) =>{
        const request = await axios.post(
            'https://calcount.develotion.com/registros.php',
            {
              idAlimento,
              idUsuario,
              cantidad,
              fecha,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey,
                'idUser': idUsuario,
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
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(comidaRegister.pending, (state)=>{
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(comidaRegister.fulfilled,(state, action) =>{
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(comidaRegister.rejected, (state, action)=>{
                state.loading = false;
                state.user = null;
                if(action.error.message === 'Request failed with status code 409'){
                    state.error = "Ya te encuentras registrado";
                    console.log(state.error)
                } else {
                    state.error = action.error.message;
                }
            })
    }
})
export default comidaRegisterSlice.reducer;
