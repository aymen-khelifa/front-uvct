import ACTIONS from './index'
import axios from 'axios'

export const fetchMyReclamations = async (token) => {
    const res = await axios.get('/myReclamation', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetMyReclamations = (res) => {
    return {
        type: ACTIONS.GET_MY_RECLAMATION,
        payload: res.data
    }
}

export const fetchReclamations = async (token) => {
    const res = await axios.get('/reclamations')
    return res
}

export const dispatchGetReclamations = (res) => {
    return {
        type: ACTIONS.GET_RECLAMATION,
        payload: res.data
    }
}

export const fetchAllReclamations = async (id) => {
    const res = await axios.get("/reclamations")
    return res
}

export const dispatchGetAllReclamations = (res) => {
    return {
        type: ACTIONS.GET_ALL_RECLAMATION,
        payload:  res.data
    }
}

export const fetchReclamation = async (id) => {
    const res = await axios.get(`/reclamation/${id}`)
    return res
}

export const dispatchGetReclamation = (res) => {
    return {
        type: ACTIONS.GET_RECLAMATION_BY_ID,
        payload:  res.data
    }
}
