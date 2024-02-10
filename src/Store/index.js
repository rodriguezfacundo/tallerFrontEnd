import {configureStore} from "@reduxjs/toolkit";
import userReducer from './UserSlice'
import registerReducer from './RegisterSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        register: registerReducer

    }
});
export default store;