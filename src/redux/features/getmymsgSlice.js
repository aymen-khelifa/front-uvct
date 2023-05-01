import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    mymessage1:{},
    error: ''
}
export const getmymessage  = createAsyncThunk("messages/getmymessage ", async (id) => {console.log('aa')
    const response =await axios.get(`http://localhost:5000/messages/getmymessage/${id}`,{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});

const mymessageSlice = createSlice({
    name: "mymessage",
    initialState,
    extraReducers: {
       
        [getmymessage.fulfilled]: (state, action) => {
            state.loading = false
            state.mymessage1 = action.payload
            state.error = ''
        },
        
       
    }
});

export default mymessageSlice.reducer;