import ACTIONS from '../actions/'


  const  sousCategories = [];
   

  const sousCategoriesReducer = (state = sousCategories, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_SOUS_CATEGORIE:
            return action.payload
        case ACTIONS.GET_SOUS_CATEGORIE:
            return action.payload 
        default:
            return state
    }
}

export default sousCategoriesReducer