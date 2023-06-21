import {EntityStatusType} from "../features/TodolistsList/todolists-reducer";
import {authApi} from "../api/todolists-api";
import {setIsLoggedIn} from "../features/Login/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type InitialStateType = {
    status:EntityStatusType
    error: string | null
    isInitialized:boolean
}

const initialState:InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false
}

export const initializeApp = createAsyncThunk(
    "app/initializeApp", async (_,{dispatch}) => {
        dispatch(setAppStatus({status:'loading'}))
            const res = await authApi.me()
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedIn({isLoggedIn:true}))
            }else{

            }

    }
)

const slice = createSlice({
    name:"app",
    initialState,
    reducers:{
        setAppStatus(state, action:PayloadAction<{status:EntityStatusType}>) {
            state.status = action.payload.status
        },
        setAppError(state,action:PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
    },
    extraReducers:builder => {
        builder
            .addCase(initializeApp.fulfilled,(state, action)=>{
                state.isInitialized = true
            })
    }
})

export const appReducer = slice.reducer
export const {setAppStatus,setAppError} = slice.actions

export type appErrorACType = ReturnType<typeof setAppError>
export type appStatusACType = ReturnType<typeof setAppStatus>

