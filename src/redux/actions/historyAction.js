import ACTIONS from './index'
import axios from 'axios'

export const fetchHistory = async (token) => {
    const res = await axios.get('/user/history')
    return res
}

export const dispatchHistory = (res) => {
    return {
        type: ACTIONS.GET_HISTORY,
        payload: res.data
        
    }
}

export const fetchHistoryByAdmin = async (id) => {
    const res = await axios.get(`/history/${id}`)
    return res
}

export const dispatchHistoryByAdmin = (res) => {
    return {
        type: ACTIONS.GET_HISTORY_BY_ADMIN,
        payload:  res.data
    }
}

