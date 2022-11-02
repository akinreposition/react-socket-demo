import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userName: '',
        password: '',
    },
    reducers: {
        registerUser: state => {
            
        }
    }
})