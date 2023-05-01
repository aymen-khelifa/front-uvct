import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    formationna:{}, 
    error: ''
}
export const getformationbyinstr = createAsyncThunk("formationbyinstr/getformationbyinstr ", async (id) => {
    console.log('id')
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

        const FormationbyinstrSlice = createSlice({
            name: "formationbyinstr",
            initialState,
            extraReducers: {
                [getformationbyinstr.fulfilled]: (state, action) => {
                    state.loading = false
                    state.formationna = action.payload
                    state.error = ''
                },
                    
    }
});


export default FormationbyinstrSlice.reducer;