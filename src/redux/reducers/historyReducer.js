import ACTIONS from '../actions/'


  const  histories = [];
   

const historyReducer = (state =  histories, action) => {
    switch(action.type){
        case ACTIONS.GET_HISTORY:
            return action.payload
        case ACTIONS.GET_HISTORY_BY_ADMIN:
            return action.payload
        default:
            return state
    }
}

export default historyReducer