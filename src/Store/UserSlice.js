import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredenciales) => {
        const request = await axios.post('https://calcount.develotion.com/login.php', userCredenciales);
        const respuesta = await request.data;
        console.log(respuesta);
        localStorage.setItem('apiKey', respuesta.apiKey);
        localStorage.setItem('idUsuario', respuesta.id);
        return respuesta;
    }

);

const userSlice = createSlice({
    name: 'user',
    initialState:{
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state)=>{
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled,(state, action) =>{
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.loading = false;
                state.user = null;
                console.log(action.error.message);
                if(action.error.message === 'Request failed with status code 409'){
                    state.error = "Credenciales invalidas";
                } else {
                    state.error = action.error.message;
                }
            })
    }
})

export default userSlice.reducer;