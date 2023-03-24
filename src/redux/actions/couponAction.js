import ACTIONS from './index'
import axios from 'axios'

export const fetchCoupons = async (token,id) => {
    const res = await axios.get(`/allCoupon/${id}`, {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchCoupons = (res) => {
    return {
        type: ACTIONS.GET_ALL_COUPONS,
        payload:  res.data
    }
}

export const fetchCoupon = async (token,idS) => {
    const res = await axios.get(`/coupon/${idS}`, 
    { headers: {Authorization: token}}
    )
    return res
}

export const dispatchGetCoupon = (res) => {
    return {
        type: ACTIONS.GET_COUPON,
        payload:  res.data
    }
}
