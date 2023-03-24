import ACTIONS from '../actions/'


  const  sections = [];
   

  const sectionsReducer = (state = sections, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_SECT:
            return action.payload
        case ACTIONS.GET_SECTION:
            return action.payload
        default:
            return state
    }
}


export default sectionsReducer