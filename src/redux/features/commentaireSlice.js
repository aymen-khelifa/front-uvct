import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    loading: false,
    
    commentaires:[],
    commentaire:[],
    error: ''
}
export const getcommentairebyfor= createAsyncThunk("commentaires/getcommentairebyfor ", async (id) => {console.log('aa')
    const response =await axios.get(`http://localhost:5000/commentaires/getcommentairebyfor/${id}`,{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});
export const getcommentairebyid= createAsyncThunk("commentaires/getcommentairebyid ", async (id) => {console.log('aa')
    const response =await axios.get(`http://localhost:5000/commentaires/getcommentairebyid/${id}`,{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});




const commentaireSlice = createSlice({
    name: "commentaire",
    initialState,
    extraReducers: {
       
        [getcommentairebyfor .fulfilled]: (state, action) => {
            state.loading = false
            state.commentaires = action.payload
            state.error = ''
        },
        [getcommentairebyid .fulfilled]: (state, action) => {
            state.loading = false
            state.commentaire = action.payload
            state.error = ''
        },
        
       
    }
});

export default commentaireSlice.reducer;