import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "./authHeader";

/*const  initialState ={
    user: localStorage.getItem('user',JSON.stringify) || null,
    token:"",
    isError: false,
    isSuccess: false,
    isLoading:false,
    isLogged:false,
    message: ""
   
}*/

const initialState = {
    user: null,
    token: null,
 }
/*export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
    try{
        const response =await axios.post('http://localhost:5000/users/login', {
            email: user.email,
            password: user.password
        },{headers:authHeader()
       
        
        });
       return response.data;
        
    }catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});*/

export const  authSlice =createSlice({
    name:'auth',
    initialState ,


    reducers:{
        login:(state, action) => {
            state.user = action.payload.user
            state.token = action.payload.accessToken
            
        },
        register:(state, action) => {
            state.user = action.payload.others
            state.token = action.payload.token
        },
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.clear()
        }
        
    },
   
});

export const {login,logout,register}=authSlice.actions;
export default authSlice.reducer;



/* extraReducers:{
       [LoginUser.pending]:(state,action) =>{
            state.isLoading = true;
       },
        [LoginUser.fulfilled]: (state, {payload:{user,accessToken, message}}) =>{
            state.isLoading = false;
            state.token=accessToken;
            state.user = user;
            state.isLogged=true;
            state.message = message;
           
        },
        [LoginUser.rejected]: (state, {payload:{message}}) =>{
            state.isLoading = true;
            state.isError = true;
            state.message = message;
        }},*/