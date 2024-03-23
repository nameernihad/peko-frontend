import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PERSIST,PURGE,REGISTER, PAUSE} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import {ClientAuth} from "./ClientAuth";

const persistConfig = { key:'Client',storage,version:1};

const userPersistReducer = persistReducer(persistConfig,ClientAuth.reducer);
export const Store = configureStore({
    reducer: {
        Client: userPersistReducer,
    },
    middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
});


export const persistor = persistStore(Store);