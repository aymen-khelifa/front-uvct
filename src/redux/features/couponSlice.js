import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    coupon:[],
    allcoupons:[],
    error: ''
}

export const getcouponbyfor = createAsyncThunk("couponSlice/getcoupon ", async (id) => {
    console.log(id)
    const response =await axios.get(`http://localhost:5000/coupons/getcoupon/${id}`,{
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data});
        export const getallcoupon = createAsyncThunk("couponSlice/getallcoupon ", async (id) => {
            console.log('id')
            const response =await axios.get('http://localhost:5000/formations/getallcoupon',{
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
                    state.coupon = action.payload
                    state.error = ''
                },
                [getallcoupon.fulfilled]: (state, action) => {
                    state.loading = false
                    state.allcoupons = action.payload
                    state.error = ''
                },
                    
    }
});

export default couponSliceSlice.reducer;