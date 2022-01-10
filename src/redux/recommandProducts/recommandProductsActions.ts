// 代表调用请求推荐列表api
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START"
// 调用成功
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS"
// 调用失败
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL"

interface FetchRecommendProductStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any,
}

interface FetchRecommendProductFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any,
}

export type RecommendProductAction =
    | FetchRecommendProductStartAction
    | FetchRecommendProductSuccessAction
    | FetchRecommendProductFailAction

export const fetchRecommendProductStartActionCreator = ():FetchRecommendProductStartAction => {
    return {
        type:FETCH_RECOMMEND_PRODUCTS_START
    }
}
export const fetchRecommendProductSuccessActionCreator = (data):FetchRecommendProductSuccessAction => {
    return {
        type:FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}
export const fetchRecommendProductFailActionCreator = (error):FetchRecommendProductFailAction => {
    return {
        type:FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}
export const giveMeDataActionCreator = ():ThunkAction<
    void,
    RootState,
    unknown,
    RecommendProductAction
    > => async(dispatch, getState) => {
    dispatch(fetchRecommendProductStartActionCreator())
    try {
        const {data} = await axios.get('http://123.56.149.216:8080/api/productCollections', {
            headers: {
                "x-icode": '97A353F65C796EE2'
            }
        })
        dispatch(fetchRecommendProductSuccessActionCreator(data))
    } catch (error: any) {
        dispatch(fetchRecommendProductFailActionCreator(error))
    }
}
