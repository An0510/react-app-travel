import languageReducer from "./language/languageReducer";
import recommandProductsReducer from './recommandProducts/recommandProductsReducer'
import {actionLog} from "./middlewares/actionLog";
import {productDetailSlice} from "./productDetail/slice";
import { combineReducers,configureStore } from '@reduxjs/toolkit'
import {productSearchSlice} from "./productSearch/slice";
import {userSlice} from "./user/slice";

// 全局的状态
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommandProductsReducer,
    productDetail:productDetailSlice.reducer,
    productSearch:productSearchSlice.reducer,
    user: userSlice.reducer,
})

const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware(),actionLog],
    // 是否启用redux-devTools
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>

export default store;
