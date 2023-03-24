import ACTIONS from './index'
import axios from 'axios'

export const fetchAllSousCategorie = async (id) => {
    const res = await axios.get(`/allSousCategorie/${id}`)
    return res
}

export const dispatchAllSousCategorie = (res) => {
    return {
        type: ACTIONS.GET_ALL_SOUS_CATEGORIE,
        payload:  res.data
    }
}

export const fetchSousCategorie = async (id) => {
    const res = await axios.get(`/souscategorie/${id}`)
    return res
}

export const dispatchGetSousCategorie = (res) => {
    return {
        type: ACTIONS.GET_SOUS_CATEGORIE,
        payload:  res.data
    }
}