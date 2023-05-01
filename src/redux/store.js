
import { configureStore,combineReducers } from '@reduxjs/toolkit';
import authSlice from "../redux/features/authSlice";
import usersSlice from "../redux/features/usersSlice";
import formationSlice from './features/formationSlice';
import storage from "redux-persist/lib/storage";
import DetailsforSlice from '../redux/features/detailsforSlice'
import FormationbyinstrSlice from '../redux/features/formationbyinstr'
import SectionbyidSlice from '../redux/features/sectionbyid'
import SessionSlice from '../redux/features/sessionSlice'
import FormationbyinsSlice from '../redux/features/formationbyins'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


/*const persistConfig = {
  key: "root",
  version: 1,
  storage,
};*/
const persistConfig1 = {
  key: "root",
  version: 1,
  storage,
};

/*const reducers = combineReducers({
  auth: authSlice,
   user :usersSlice,
   formation:formationSlice,
   detailfor:DetailsforSlice,
   formationbyinstr:FormationbyinstrSlice,
   formationbyins:FormationbyinsSlice,
   sectionbyid:SectionbyidSlice,
   session:SessionSlice,
})*/
const reducers1 = combineReducers({
  auth: authSlice,
   user :usersSlice,
   formation:formationSlice,
   detailfor:DetailsforSlice,
   formationbyinstr:FormationbyinstrSlice,
   formationbyins:FormationbyinsSlice,
   sectionbyid:SectionbyidSlice,
   session:SessionSlice,
})


//const persistedReducer = persistReducer(persistConfig, reducers);
const persistedReducer1 = persistReducer(persistConfig1, reducers1);


export const store1 = configureStore({
  reducer: persistedReducer1,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store1);




