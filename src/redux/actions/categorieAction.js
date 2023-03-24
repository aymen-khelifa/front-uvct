import ACTIONS from './index'
import axios from 'axios'

export const fetchCategories = async () => {
    const res = await axios.get('/allCategorie')
    return res
}

export const dispatchCategories = (res) => {
    return {
        type: ACTIONS.GET_ALL_CATEGORIE,
        payload:  res.data
    }
}

export const fetchCategorie = async (id) => {
    const res = await axios.get(`/categorie/${id}`)
    return res
}

export const dispatchGetCategorie = (res) => {
    return {
        type: ACTIONS.GET_CATEGORIE,
        payload:  res.data
    }
}