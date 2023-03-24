import ACTIONS from './index'
import axios from 'axios'

export const fetchMyFormations = async (token) => {
    const res = await axios.get('/myFormations', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetMyFormations = (res) => {
    return {
        type: ACTIONS.GET_MY_FORMATIONS,
        payload: res.data
    }
}

export const fetchAllFormations = async () => {
    const res = await axios.get('/allFormations')
    return res
}

export const dispatchGetAllFormations = (res) => {
    return {
        type: ACTIONS.GET_ALL_FORMATIONS,
        payload: res.data
    }
}

export const fetchFormation = async (token,titre1) => {
    const res = await axios.get(`/myFormation/${titre1}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetFormation = (res) => {
    return {
        type: ACTIONS.GET_MY_FORMATION,
        payload:  res.data
    }
}

export const fetchFormations = async () => {
    const res = await axios.get('/formations')
    return res
}

export const dispatchGetFormations = (res) => {
    return {
        type: ACTIONS.GET_FORMATIONS,
        payload: res.data
    }
}
export const fetchArchiveFormations = async () => {
    const res = await axios.get('/formationsArchive')
    return res
}

export const dispatchGetArchiveFormations = (res) => {
    return {
        type: ACTIONS.GET_ARCHIVE_FORMATIONS,
        payload: res.data
    }
}