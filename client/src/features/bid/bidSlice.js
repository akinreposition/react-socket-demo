import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import bidService from './bidService';

const initialState = {
    bids: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const bidSlice = createSlice({
    name: 'bid',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})

const { rest } = bidSlice.actions
export default bidSlice.reducer