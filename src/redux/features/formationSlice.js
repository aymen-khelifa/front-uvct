import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    formatiozn:[],
    formationsarchive:[],
    formationid:[],
    formationcanbyid:[],
    error: ''
  }



export const getformations  = createAsyncThunk("formations/getformations ", async () => {
    const response =await axios.get('http://localhost:5000/formations/getallformation',{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});
export const getarchiveformations  = createAsyncThunk("formations/getarchiveformations ", async () => {
    const response =await axios.get('http://localhost:5000/formations/getarchiveformations',{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});




const FormationSlice = createSlice({
    name: "formation",
    initialState,
    extraReducers: {
       
        [getformations.fulfilled]: (state, action) => {
            state.loading = false
            state.formatiozn = action.payload
            state.error = ''
        },[getarchiveformations.fulfilled]: (state, action) => {
            state.loading = false
            state.formationsarchive = action.payload
            state.error = ''
        },
        
       
    }
});

export default FormationSlice.reducer;