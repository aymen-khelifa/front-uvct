import ACTIONS from './index'
import axios from 'axios'

export const fetchSessions = async (token,id) => {
    const res = await axios.get(`/allSession/${id}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchSessions = (res) => {
    return {
        type: ACTIONS.GET_ALL_SESSION,
        payload:  res.data
    }
}

export const fetchSession = async (token,idS) => {
    const res = await axios.get(`/session/${idS}`, 
    { headers: {Authorization: token}}
    )
    return res
}

export const dispatchGetSession = (res) => {
    return {
        type: ACTIONS.GET_SESSION,
        payload:  res.data
    }
}