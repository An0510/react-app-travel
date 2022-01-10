import {createStore, combineReducers, applyMiddleware} from 'redux';
import languageReducer from "./language/languageReducer";
import recommandProductsReducer from './recommandProducts/recommandProductsReducer'
import thunk from 'redux-thunk'
import {actionLog} from "./middlewares/actionLog";


const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommandProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk,actionLog));

export type RootState = ReturnType<typeof store.getState>

export default store;
