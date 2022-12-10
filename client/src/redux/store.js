import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/productsSlice";


const store = configureStore({
    reducer:{
productsData : productsSlice,
    }
})

export default store