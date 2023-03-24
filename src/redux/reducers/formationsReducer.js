import ACTIONS from '../actions/'


  const  formations = [];
   

  const formationsReducer = (state = formations, action) => {
    switch(action.type){
        case ACTIONS.GET_MY_FORMATIONS:
            return action.payload
        case ACTIONS.GET_MY_FORMATION:
                return action.payload
        case ACTIONS.GET_ALL_FORMATION:
                return action.payload
        case ACTIONS.GET_FORMATIONS:
                return action.payload
        case ACTIONS.GET_ARCHIVE_FORMATIONS:
                return action.payload
        default:
            return state
    }
}


export default formationsReducer