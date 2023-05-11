import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    myreclamationn:{},
    error: ''
}

export const getmyreclamation  = createAsyncThunk("reclamations/getmyreclamation ", async (id) => {console.log('aa')
    const response =await axios.get(`http://localhost:5000/reclamations/getmyreclamation/${id}`,{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});
const myrecSlice = createSlice({
    name: "myreclamation",
    initialState,
    extraReducers: {
       
        [getmyreclamation.fulfilled]: (state, action) => {
            state.loading = false
            state.myreclamationn = action.payload
            state.error = ''
        },
        
       
    }
});

export default myrecSlice.reducer;