import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    reclamation:[],
    error: ''
}
export const getreclamations  = createAsyncThunk("reclamations/getreclamations ", async () => {console.log('aa')
    const response =await axios.get('http://localhost:5000/reclamations/getreclamation',{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});

const ReclamationsSlice = createSlice({
    name: "reclamation",
    initialState,
    extraReducers: {
       
        [getreclamations.fulfilled]: (state, action) => {
            state.loading = false
            state.reclamation = action.payload
            state.error = ''
        },
        
       
    }
});

export default ReclamationsSlice.reducer;