import ACTIONS from './index'
import axios from 'axios'

export const dispatchLogin = (res) => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('http://localhost:5000/users/getuser', {
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
            isAdmin: res.data.role === "admin" ? true : false ,
            isSuperAdmin: res.data.role === "super admin" ? true : false ,
           
        }
    }
}

export const fetchUserDetails = async (token,id) => {
    const res = await axios.get(`/user/details/${id}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetUserDetails = (res) => {
    return {
        type: ACTIONS.GET_USER_DET,
        payload: {
            admin: res.data,
        }
    }
}

