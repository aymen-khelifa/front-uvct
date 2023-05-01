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
import couponSliceSlice from '../redux/features/couponSlice'
import ReclamationsSlice from '../redux/features/reclamationsSlice'
import ReclamationsbyidSlice from '../redux/features/recbyid'
import myrecSlice from '../redux/features/myrecSlice';
import mymessageSlice from '../redux/features/getmymsgSlice'
import mymessageinstSlice from '../redux/features/mymsginstSlice'
import messagebyidSlice from '../redux/features/msgbyid'
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

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const reducers = combineReducers({
    auth: authSlice,
     user :usersSlice,
     couponSlice:couponSliceSlice,
     formation:formationSlice,
     detailfor:DetailsforSlice,
     formationbyinstr:FormationbyinstrSlice,
     formationbyins:FormationbyinsSlice,
     sectionbyid:SectionbyidSlice,
     session:SessionSlice,
     reclamation:ReclamationsSlice,
     reclamationbyid:ReclamationsbyidSlice,
     myreclamation:myrecSlice,
     mymessage:mymessageSlice,
     mymessageinst:mymessageinstSlice,
     messagebyid:messagebyidSlice,



  })

  const persistedReducer = persistReducer(persistConfig, reducers);

  export const store = configureStore({
    reducer: persistedReducer,
  
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  export let persistor = persistStore(store);