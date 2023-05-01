import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    mymessageinst1:{},
    error: ''
}
export const getmymessageinst  = createAsyncThunk("messages/getmymessageinst ", async (id) => {console.log('aa')
    const response =await axios.get(`http://localhost:5000/messages/getmessageamoi/${id}`,{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});

const mymessageinstSlice = createSlice({
    name: "mymessageinst",
    initialState,
    extraReducers: {
       
        [getmymessageinst.fulfilled]: (state, action) => {
            state.loading = false
            state.mymessageinst1 = action.payload
            state.error = ''
        },
        
       
    }
});

export default mymessageinstSlice.reducer;
