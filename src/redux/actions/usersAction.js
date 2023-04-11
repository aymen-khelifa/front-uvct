import ACTIONS from './index'
import axios from 'axios'

export const fetchAllUsers = async (token) => {
    const res = await axios.get('http://localhost:5000/users/getapprenant', {
    },{
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true 
     })
    return res
}
export const fetchAllCond = async (token) => {
    const res = await axios.get('http://localhost:5000/users/formateurs', {
    },{
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true 
     })
    return res
}
export const fetchAllInstr = async (token) => {
    const res = await axios.get('http://localhost:5000/users/getinstr', {
    },{
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true 
     })
    return res
}

export const fetchAllAdmin = async () => {
    const res = await axios.get('http://localhost:5000/users/getAdmin', {
    },{
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true 
     })
    
    return res
}

export const fetchUserById = async (id) => {
    const res = await axios.get(`/user/user/${id}`)
    return res
}

export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    }
}

export const dispatchGetAllCond= (res) => {
    return {
        type: ACTIONS.GET_ALL_COND,
        payload: res.data
    }
}
export const dispatchGetAllInstr= (res) => {
    return {
        type: ACTIONS.GET_ALL_INSTR,
        payload: res.data,
        //isInstr: res.data.role === "instructeur" ? true : false ,
    }
}

export const dispatchGetAllAdmin= (res) => {
    return {
        type: ACTIONS.GET_ALL_ADMIN,
        payload: res.data
    }
}

export const dispatchGetAllUserById= (res) => {
    return {
        type: ACTIONS.GET_USER_BY_ID,
        payload: res.data
    }
}
