import ACTIONS from '../actions/'

const initialState = {
    user: {},
    admin:{},
    apprenant:{},//5ater kazem ykoun verifier ema user houa bidou apprenant 
    loginUser: localStorage.getItem('loginUser') || {},
    candidat:{},
    instructeur:{},
    refreshToken:localStorage.getItem('refreshToken') || "",
    isLogged:  false,
   /* isAdmin: false,
    isInstr: false,
    isSuperAdmin: false,
    isapprenant:false,*/
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            localStorage.setItem('loginUser', JSON.stringify(action.payload));
            localStorage.setItem('isLogged', true);
           
            return {
                ...state,
                
                isLogged: true,
                
                loginUser:action.payload,
                
            }
       
        case ACTIONS.GET_USER:
            return {
                ...state,
                loginUser:action.payload,
                user: action.payload.user,
               /* isAdmin: action.payload.isAdmin,
                isInstr: action.payload.isInstr,
                isSuperAdmin: action.payload.isSuperAdmin,
                isapprenant:action.payload.isapprenant,
              
               user: action.payload,
               isAdmin: action.payload,
               isInstr: action.payload,
               isSuperAdmin: action.payload,
               isapprenant:action.payload,*/
            }
        case ACTIONS.GET_USER_DET:
            return {
                ...state,
                candidat: action.payload,
              
            }
            case ACTIONS.GET_USER_DETA:
                return {
                    ...state,
                    instructeur: action.payload,   
                }
                case ACTIONS.GET_USER_DETB:
                    return {
                        ...state,
                        apprenant: action.payload,  
                    }
                    case ACTIONS.GET_USER_DETC:
                        return {
                            ...state,
                            admin: action.payload, 
                        }
        default:
            return state
    }
}

export default authReducer