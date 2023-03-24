import ACTIONS from '../actions/'


  const  coupons = [];
   

  const couponReducer = (state = coupons, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_COUPONS:
            return action.payload
        case ACTIONS.GET_COUPON:
            return action.payload
        default:
            return state
    }
}


export default couponReducer