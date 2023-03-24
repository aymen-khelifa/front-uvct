import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
import events from './eventsReducer'
import comptes from './compteReducer'
import formations from './formationsReducer'
import sections from './sectionReducer'
import sessions from './sessionReducer'
import categorie from './categorieReducer'
import sousCategorie from './sousCategorieReducer'
import reclamations from './reclamationReducer'
import histories from './historyReducer'
import coupons from './couponReducer'


export default combineReducers({
    auth,
    token,
    users,
    events,
    comptes,
    formations,
    sections,
    sessions,
    categorie,
    sousCategorie,
    reclamations,
    histories,
    coupons,
})