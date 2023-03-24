import ACTIONS from './index'
import axios from 'axios'

export const fetchMyCompte = async (token) => {
    const res = await axios.get('/myCompte', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetMyCompte = (res) => {
    return {
        type: ACTIONS.GET_MY_COMPTE,
        payload: res.data
        
    }
}

