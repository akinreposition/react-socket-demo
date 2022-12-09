import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authentication/authSlice'
import bidReducer from './features/bid/bidSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        bid: bidReducer
    }
})