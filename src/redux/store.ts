import { createStore,combineReducers } from 'redux';
import languageReducer from "./language/languageReducer";
import recommandProductsReducer from './recommandProducts/recommandProductsReducer'

const rootReducer = combineReducers({
    language:languageReducer,
    recommendProducts:recommandProductsReducer
})

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>

export default store;
