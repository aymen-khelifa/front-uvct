import ACTIONS from '../actions/'


  const  users = [];
   

const usersReducer = (state = users, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_USERS:
            return action.payload
            case ACTIONS.GET_ALL_COND:
                return action.payload
            case ACTIONS.GET_ALL_INSTR:
                return action.payload
            case ACTIONS.GET_ALL_ADMIN:
                return action.payload
            case ACTIONS.GET_USER_BY_ID:
                return action.payload
        default:
            return state
    }
}

export default usersReducer