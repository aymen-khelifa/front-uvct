import ACTIONS from '../actions/'


  const  sessions = [];
   

  const sessionReducer = (state = sessions, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_SESSION:
            return action.payload
        case ACTIONS.GET_SESSION:
            return action.payload
        default:
            return state
    }
}


export default sessionReducer