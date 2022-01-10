import {Middleware} from "redux";

export const actionLog:Middleware = (store) => (next) => (action) => {
    console.log('state当前',store.getState())
    console.log('fire action',action)
    next(action)
    console.log('state更新后',store.getState())
}
