import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    sections:[],
    error: ''
}
export const getsectionbyid = createAsyncThunk("sectionbyid/getsectionbyid ", async (id) => {
    const response =await axios.get(`http://localhost:5000/sections/getsectionbyid/${id}`,{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data});

        const SectionbyidSlice = createSlice({
            name: "sectionbyid",
            initialState,
            extraReducers: {
                [getsectionbyid.fulfilled]: (state, action) => {
                    state.loading = false
                    state.sections = action.payload
                    state.error = ''
                }
                    
    }
});
export default SectionbyidSlice.reducer;