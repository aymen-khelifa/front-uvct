import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    candidatfordet:[],
    fordet:[],error: ''
}



export const getformation = createAsyncThunk("detailfor/getformation ", async (id) => {
    const response =await axios.get(`http://localhost:5000/formations/getformationbyid/${id}`,{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data});

        export const getformationcandi  = createAsyncThunk("detailfor/getformationcandi ", async (id) => {
            const response =await axios.get(`http://localhost:5000/formations/getformationcanbyid/${id}`,{
        
            
                headers: {'X-Requested-With': 'XMLHttpRequest', 
                "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
               "withCredentials": true ,
             })
                return  response.data
         
        });


        const DetailsforSlice = createSlice({
            name: "detailfor",
            initialState,
            extraReducers: {
                [getformation.fulfilled]: (state, action) => {
                    state.loading = false
                    state.fordet = action.payload
                    state.error = ''
                },[getformationcandi.fulfilled]: (state, action) => {
                    state.loading = false
                    state.candidatfordet = action.payload
                    state.error = ''
                },
                    
    }
});


export default DetailsforSlice.reducer;