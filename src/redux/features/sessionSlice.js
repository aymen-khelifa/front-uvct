import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    sessions:[],
    error: ''
}

export const getsession = createAsyncThunk("session/getsession ", async (id) => {
    const response =await axios.get(`http://localhost:5000/sessions/getsession/${id}`,{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
    });
        const SessionSlice = createSlice({
            name: "session",
            initialState,
            extraReducers: {
                [getsession.fulfilled]: (state, action) => {
                    state.loading = false
                    state.sessions = action.payload
                    state.error = ''
                }
                    
    }
});
export default SessionSlice.reducer;