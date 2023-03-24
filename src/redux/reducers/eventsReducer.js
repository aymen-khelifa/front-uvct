import ACTIONS from '../actions/'


  const  events = [];
   

const eventsReducer = (state = events, action) => {
    switch(action.type){
        case ACTIONS.GET_MY_EVENTS:
            return action.payload
        case ACTIONS.GET_EVENTS:
            return action.payload
        case ACTIONS.GET_EVENT:
            return action.payload
        case ACTIONS.GET_ARCHIVE_EVENTS:
            return action.payload
        default:
            return state
    }
}

export default eventsReducer