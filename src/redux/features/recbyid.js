import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    reclamationid:[],
    error: ''
}

export const getreclamationbyid  = createAsyncThunk("reclamations/getreclamationbyid ", async (id) => {console.log('aa')
    const response =await axios.get(`http://localhost:5000/reclamations/getreclamation/${id}`,{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});

const ReclamationsbyidSlice = createSlice({
    name: "reclamationbyid",
    initialState,
    extraReducers: {
       
        [getreclamationbyid.fulfilled]: (state, action) => {
            state.loading = false
            state.reclamationid = action.payload
            state.error = ''
        },
        
       
    }
});

export default ReclamationsbyidSlice.reducer;
