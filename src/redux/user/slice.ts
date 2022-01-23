import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface userState {
    loading: boolean,
    error: string | null,
    token: string | null,
}

const initialState: userState = {
    loading: false,
    error: null,
    token: null,
}

export const signIn = createAsyncThunk(
    "user/signIn",
    async (parameters: {
        email: string,
        password: string,
    }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/auth/login`, {
                email:parameters.email,
                password:parameters.password
            }
        )
        return data.token
    })

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut:(state) => {
            state.loading = false
            state.error = null
            state.token = null
        }
    },
    extraReducers:{
        [signIn.pending.type]:(state) => {
            state.loading = true
        },
        [signIn.fulfilled.type]:(state,action:PayloadAction<string|null>) => {
            state.loading = false
            state.token = action.payload
        },
        [signIn.rejected.type]:(state,action:PayloadAction<string|null>) => {
            state.loading = false
            state.error = action.payload
        }
    }
})
