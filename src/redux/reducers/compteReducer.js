import ACTIONS from '../actions/'


  const  comptes = [];
   

const compteReducer = (state = comptes, action) => {
    switch(action.type){
        case ACTIONS.GET_MY_COMPTE:
            return action.payload
        default:
            return state
    }
}

export default compteReducer