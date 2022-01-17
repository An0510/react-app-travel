import {createStore, applyMiddleware} from 'redux';
import languageReducer from "./language/languageReducer";
import recommandProductsReducer from './recommandProducts/recommandProductsReducer'
import thunk from 'redux-thunk'
import {actionLog} from "./middlewares/actionLog";
import {productDetailSlice} from "./productDetail/slice";
import { combineReducers,configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommandProductsReducer,
    productDetail:productDetailSlice.reducer
})

const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(),actionLog],
    // 是否启用redux-devTools
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>

export default store;
