import ACTIONS from './index'
import axios from 'axios'

export const fetchSections = async (token,id) => {
    const res = await axios.get(`/allSection/${id}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchSections = (res) => {
    return {
        type: ACTIONS.GET_ALL_SECT,
        payload:  res.data
    }
}

export const fetchSection = async (token,idS) => {
    const res = await axios.get(`/section/${idS}`, 
    { headers: {Authorization: token}}
    )
    return res
}

export const dispatchGetSection = (res) => {
    return {
        type: ACTIONS.GET_SECTION,
        payload:  res.data
    }
}
