import ACTIONS from '../actions/'


  const  reclamations = [];
   

const reclamationsReducer = (state = reclamations, action) => {
    switch(action.type){
        case ACTIONS.GET_MY_RECLAMATION:
            return action.payload
        case ACTIONS.GET_RECLAMATION:
            return action.payload
        case ACTIONS.GET_RECLAMATION_BY_ID:
            return action.payload
        case ACTIONS.GET_ALL_RECLAMATION:
            return action.payload
        default:
            return state
    }
}

export default reclamationsReducer