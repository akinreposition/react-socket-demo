import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from './productService';

const initialState = {
    products: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

// Create new product
export const createProduct = createAsyncThunk('product/create', async (productData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.createProduct(productData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user products
export const getProducts = createAsyncThunk('product/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.getProducts(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        // create product
        .addCase( createProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.product.push(action.payload)
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        // get product
        .addCase( getProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.product = action.payload
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = productSlice.actions
export default productSlice.reducer