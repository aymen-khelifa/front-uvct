import ACTIONS from './index'
import axios from 'axios'

export const dispatchLogin = (res) => {
    return {
        type: ACTIONS.LOGIN,
        payload:res.data.user,
    }
}


/*export const dispatchLogout = (res) => {
    return {
        type: ACTIONS.LOGOUT,
        payload:res.data.user,
    }
}
export const setIsLogged = () => ({
    type: ACTIONS.SET_IS_LOGGED,
    payload: true
  })
  */

export const fetchUser = async (token,id) => {
    //`http://localhost:5000/users/getuser/${id}`
    const res = await axios.get(`http://localhost:5000/users/getuser`, {
       },{   
    headers: {'X-Requested-With': 'XMLHttpRequest', 
    "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
    "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
   "withCredentials": true })
    return res ; 
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        
        payload: {
            user: res.data,
           // isAdmin: res.data.role === "admin" ? true : false ,
            //isSuperAdmin: res.data.role === "superadmin" ? true : false ,
            //isInstr: res.data.role === "instructeur" ? true : false ,
            //isapprenant:res.data.role==="apprenant" ? true : false,
        }
    }
}

export const fetchUserDetails = async (token,id) => {
    const res = await axios.get(`http://localhost:5000/users/details/${id}`, {
       // headers: {Authorization: token}
    },{  headers: {'X-Requested-With': 'XMLHttpRequest', 
    "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
    "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
   "withCredentials": true })
    
    return res
}

export const dispatchGetUserDetails = (res) => {
    return {
        type: ACTIONS.GET_USER_DET,
        payload: 
          //  admin: res.data,
        res.data,
        
    }
}

export const fetchUserDetails1 = async (token,id) => {
    const res = await axios.get(`http://localhost:5000/users/details1/${id}`, {
       // headers: {Authorization: token}
    },{  headers: {'X-Requested-With': 'XMLHttpRequest', 
    "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
    "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
   "withCredentials": true })
    
    return res
}
export const dispatchGetUserDetails1 = (res) => {
    return {
        type: ACTIONS.GET_USER_DETA,
        payload: 
          //  admin: res.data,
           res.data,
        
    }
}

export const fetchUserDetails2 = async (token,id) => {
    const res = await axios.get(`http://localhost:5000/users/details2/${id}`, {
       // headers: {Authorization: token}
    },{  headers: {'X-Requested-With': 'XMLHttpRequest', 
    "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
    "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
   "withCredentials": true })
    
    return res
}
export const dispatchGetUserDetails2 = (res) => {
    return {
        type: ACTIONS.GET_USER_DETB,
        payload: 
          //  apprenant: res.data,
           res.data,
        
    }
}
export const fetchUserDetails3 = async (token,id) => {
    const res = await axios.get(`http://localhost:5000/users/details3/${id}`, {
       // headers: {Authorization: token}
    },{  headers: {'X-Requested-With': 'XMLHttpRequest', 
    "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
    "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
   "withCredentials": true })
    
    return res
}
export const dispatchGetUserDetails3 = (res) => {
    return {
        type: ACTIONS.GET_USER_DETC,
        payload: 
          //  admin: res.data,
           res.data,
        
    }
}
