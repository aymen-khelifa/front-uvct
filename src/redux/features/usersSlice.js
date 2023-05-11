import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "./authHeader";

const initialState = {
    loading: false,
    
    instructeur:[],
    instructeurs:[],
    candidats1:[],
    candidats:[],
    admin:[],
    admins:[],
    apprenant:[],
    apprenants:[],
    error: ''
  }
// liste des formateur candidat 
export const getCandidatFormateur  = createAsyncThunk("users/getCandidatFormateur", async () => {
    const response =await axios.get('http://localhost:5000/users/formateurs',{

           headers: {'X-Requested-With': 'XMLHttpRequest', 
           "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
           "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
          "withCredentials": true 
        })
    return response.data;
 
});
//liste des instructeur
export const getInstructeur  = createAsyncThunk("users/getInstructeur ", async () => {
    const response =await axios.get('http://localhost:5000/users/getinstr',{

    
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true ,
     })
        return  response.data
 
});


// liste des admin 
export const getAdmin  = createAsyncThunk("users/getAdmin ", async () => {
    const response =await axios.get('http://localhost:5000/users/getAdmin',{

           headers: {'X-Requested-With': 'XMLHttpRequest', 
           "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
           "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
          "withCredentials": true 
        })
    return response.data;
 
});

//liste des apprenanant 
export const getApprenant  = createAsyncThunk("users/getApprenant ", async () => {
    const response =await axios.get('http://localhost:5000/users/getapprenant',{

           headers: {'X-Requested-With': 'XMLHttpRequest', 
           "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
           "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
          "withCredentials": true 
        })
    return response.data;
});

//getUserbyId
export const getapprenantbyId  = createAsyncThunk("users/getapprenantbyId ", async (id) => {
    const response =await axios.get(`http://localhost:5000/users/details2/${id}`,{

           headers: {'X-Requested-With': 'XMLHttpRequest', 
           "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
           "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
          "withCredentials": true 
        })
    return response.data;
});
export const getadminbyId  = createAsyncThunk("users/getadminbyId ", async (id) => {
    const response =await axios.get(`http://localhost:5000/users/details3/${id}`,{

           headers: {'X-Requested-With': 'XMLHttpRequest', 
           "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
           "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
          "withCredentials": true 
        })
    return response.data;
});
export const getinstructeurbyId  = createAsyncThunk("users/getinstructeurbyId ", async (id) => {
    const response =await axios.get(`http://localhost:5000/users/details1/${id}`,{

           headers: {'X-Requested-With': 'XMLHttpRequest', 
           "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
           "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
          "withCredentials": true 
        })
    return response.data;
});
export const getcandidatbyId  = createAsyncThunk("users/getcandidatbyId ", async (id) => {
    const response =await axios.get(`http://localhost:5000/users/details/${id}`,{

           headers: {'X-Requested-With': 'XMLHttpRequest', 
           "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
           "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
          "withCredentials": true 
        })
    return response.data;
});
/*const userEntity = createEntityAdapter({
    selectId: (user) => user.id
});*/

const UserSlice = createSlice({
    name: "user",
    initialState,
   // reducers:{getInstructeur:(state,action)=>{state.users=action.payload}},
    extraReducers: {
        [getCandidatFormateur.fulfilled]: (state, action) => {
            state.loading = false
            state.candidats = action.payload
            state.error = ''
        },
        [getInstructeur.fulfilled]: (state, action) => {
            state.loading = false
            state.instructeurs = action.payload
            state.error = ''
        },
        [getAdmin.fulfilled]: (state, action) => {
            state.loading = false
            state.admins = action.payload
            state.error = ''
        },
        [getApprenant.fulfilled]: (state, action) => {
            state.loading = false
            state.apprenants = action.payload
            state.error = ''
        },
        [getapprenantbyId.fulfilled]: (state, action) => {
            state.loading = false
            state.apprenant = action.payload
            state.error = ''
        },
        [getadminbyId.fulfilled]: (state, action) => {
            state.loading = false
            state.admin = action.payload
            state.error = ''
        },
        [getinstructeurbyId.fulfilled]: (state, action) => {
            state.loading = false
            state.instructeur = action.payload
            state.error = ''
        },
        [getcandidatbyId.fulfilled]: (state, action) => {
            state.loading = false
            state.candidats1 = action.payload
            state.error = ''
        },

    }
});
//export const {getInstructeur}=UserSlice.actions;
//export const userSelectors = userEntity.getSelectors(state => state.user);
export default UserSlice.reducer;