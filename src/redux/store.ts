import languageReducer from "./language/languageReducer";
import recommandProductsReducer from './recommandProducts/recommandProductsReducer'
import {actionLog} from "./middlewares/actionLog";
import {productDetailSlice} from "./productDetail/slice";
import { combineReducers,configureStore } from '@reduxjs/toolkit'
import {productSearchSlice} from "./productSearch/slice";
import {userSlice} from "./user/slice";
import {persistStore, persistReducer} from 'redux-persist'
import localStorage from "redux-persist/es/storage";
import {shoppingCartSlice} from "./shoppingCart/slice";
import {orderSlice} from "./order/slice";

const persistConfig = {
    key:"root",
    storage:localStorage,
    // 不设置就会全保存,白名单就是只保存xxx:user指向的就是redux中的user-reducer,如果用黑名单就是除xx以外全保存
    // 代表会将user部分保存起来
    whitelist:["user"]
}

// 全局的状态
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommandProductsReducer,
    productDetail:productDetailSlice.reducer,
    productSearch:productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart:shoppingCartSlice.reducer,
    order:orderSlice.reducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    // https://github.com/reduxjs/redux-toolkit/issues/870
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({serializableCheck: false,}),actionLog],
    // 是否启用redux-devTools
    devTools: true
});

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export default {store,persistor};
