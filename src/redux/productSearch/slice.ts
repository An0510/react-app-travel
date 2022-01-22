import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchState {
    loading: boolean
    error: string | null
    data: any,
    pagination: any;
}

const initialState: ProductSearchState = {
    loading: true,
    error: null,
    data: null,
    pagination: null,
}

export const searchProduct = createAsyncThunk(
    "productSearch/searchProduct",
    async (paramaters: {
        keywords: string,
        nextPage: number | string,
        pageSize: number | string,
    }, thunkAPI) => {
        let requestUrl = `http://123.56.149.216:8080/api/touristRoutes?pagenumber=${paramaters.nextPage}&pagesize=${paramaters.pageSize}`
        if (paramaters.keywords) {
            requestUrl += `&keyword=${paramaters.keywords}`
        }
        const response = await axios.get(requestUrl)
        return {
            data:response.data,
            pagination:JSON.parse(response.headers["x-pagination"])
        }
    })
export const productSearchSlice = createSlice({
    name: 'productSearch',
    initialState,
    reducers: {},
    extraReducers: {
        [searchProduct.pending.type]: (state) => {
            // return {...state,loading:true}
            state.loading = true
        },
        [searchProduct.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.data = action.payload.data
            state.pagination = action.payload.pagination
            state.loading = false
            state.error = null
        },
        [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
            const ddd = action.payload
            state.loading = false
            state.error = action.payload
        }
    }
})
