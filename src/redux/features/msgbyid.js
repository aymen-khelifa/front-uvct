import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    msgbyid1:{},
    error: ''
}
export const messagebyid  = createAsyncThunk("messages/messagebyid ", async (id) => {console.log('aa')
    const response =await axios.get(`http://localhost:5000/messages/getmessagebyid/${id}`,{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});

const messagebyidSlice = createSlice({
    name: "messagebyid",
    initialState,
    extraReducers: {
       
        [messagebyid.fulfilled]: (state, action) => {
            state.loading = false
            state.msgbyid1 = action.payload
            state.error = ''
        },
        
       
    }
});

export default messagebyidSlice.reducer;
