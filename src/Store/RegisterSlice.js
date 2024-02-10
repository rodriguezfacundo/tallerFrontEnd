import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const userRegister = createAsyncThunk(
    'user/userRegister',
    async(userRegisterCredenciales) =>{
        console.log('userCredenciales', userRegisterCredenciales);
        const request = await axios.post('https://calcount.develotion.com/usuarios.php', userRegisterCredenciales);
        const respuesta = await request.data;
        console.log('respuesta', respuesta);
        localStorage.setItem('apiKey', respuesta.apiKey);
        localStorage.setItem('idUsuario', respuesta.id);
        return respuesta;

    }
);

const registerSlice = createSlice({
    name: 'userRegister',
    initialState:{
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state)=>{
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(userRegister.fulfilled,(state, action) =>{
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(userRegister.rejected, (state, action)=>{
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
export default registerSlice.reducer;
