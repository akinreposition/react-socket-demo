import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authentication/authSlice'
import productReducer from './features/product/productSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer
    }
})