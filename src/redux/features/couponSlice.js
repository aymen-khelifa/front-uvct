import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    coupons:[],
    error: ''
}

export const getcouponbyfor = createAsyncThunk("couponSlice/getcouponbyfor ", async () => {
    console.log('id')
    const response =await axios.get('http://localhost:5000/formations/getcouponbyfor',{
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data});

        const couponSliceSlice = createSlice({
            name: "couponSlice",
            initialState,
            extraReducers: {
                [getcouponbyfor.fulfilled]: (state, action) => {
                    state.loading = false
                    state.coupons = action.payload
                    state.error = ''
                },
                    
    }
});

export default couponSliceSlice.reducer;