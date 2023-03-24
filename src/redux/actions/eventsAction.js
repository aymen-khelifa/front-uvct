import ACTIONS from './index'
import axios from 'axios'

export const fetchMyEvents = async (token) => {
    const res = await axios.get('/myEvents', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetMyEvents = (res) => {
    return {
        type: ACTIONS.GET_MY_EVENTS,
        payload: res.data
    }
}

export const fetchEvents = async (token) => {
    const res = await axios.get('/events')
    return res
}

export const dispatchGetEvents = (res) => {
    return {
        type: ACTIONS.GET_EVENTS,
        payload: res.data
    }
}
export const fetchEvent = async (id) => {
    const res = await axios.get(`/event/${id}`)
    return res
}

export const dispatchGetEvent = (res) => {
    return {
        type: ACTIONS.GET_EVENT,
        payload:  res.data
    }
}
export const fetchArchiveEvents = async () => {
    const res = await axios.get('/archiveEvents')
    return res
}

export const dispatchGetArchiveEvents = (res) => {
    return {
        type: ACTIONS.GET_ARCHIVE_EVENTS,
        payload: res.data
    }
}

