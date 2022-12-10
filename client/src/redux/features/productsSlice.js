import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STATUSES = {
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error'
}



export const getProducts = createAsyncThunk('gettingData', async () => {

  const res = await axios.get('http://localhost:8000/')

  return res.data.data
})





export const postProducts = createAsyncThunk('posting', async (postData) => {
    await axios.post('http://localhost:8000/', postData)
        .then(res => {
            console.log(res);

        })
        .catch(err => {
            console.log(err);
        })
})



export const deleteProduct = createAsyncThunk('productDeleted', async (_id) => {
    await axios.delete(`http://localhost:8000/${_id}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
})

export const updateProduct = createAsyncThunk('productUpdated', async (updatedTodo) => {

    await axios.put(`http://localhost:8000/`,updatedTodo)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })

})









const productsSlice = createSlice({
    name: 'products',

    initialState: {
        data: [],
        status: STATUSES
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.status = STATUSES.LOADING
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.status = STATUSES.IDLE
            state.data.push(action.payload)
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.status = STATUSES.ERROR
        })
    }

})

export default productsSlice.reducer