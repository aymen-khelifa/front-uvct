import { createSlice } from "@reduxjs/toolkit";


export const  userSlice =createSlice({
    name:'',
    initialState :{},


    reducers:{

        login:(state,action)=>state=action.payload
    }
});

export const {login}=userSlice.actions;
export default userSlice.reducer;