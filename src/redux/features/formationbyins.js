import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    formationn1:{}, 
    error: ''
}
export const getformationbyins = createAsyncThunk("formationbyins/getformationbyins ", async (id) => {
    const response =await axios.get(`http://localhost:5000/formations/getformationbyinstr/${id}`,{
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data});
        /*export const getformationcandi  = createAsyncThunk("detailfor/getformationcandi ", async (id) => {
            const response =await axios.get(`http://localhost:5000/formations/getformationcanbyid/${id}`,{
        
            
                headers: {'X-Requested-With': 'XMLHttpRequest', 
                "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
               "withCredentials": true ,
             })
                return  response.data
         
        });*/

        const FormationbyinsSlice = createSlice({
            name: "formationbyins",
            initialState,
            extraReducers: {
                [getformationbyins.fulfilled]: (state, action) => {
                    state.loading = false
                    state.formationn = action.payload
                    state.error = ''
                },
                    
    }
});
export default FormationbyinsSlice.reducer;