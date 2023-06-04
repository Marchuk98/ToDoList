import {EntityStatusType} from "../features/TodolistsList/todolists-reducer";
import {Dispatch} from "redux";
import {authApi} from "../api/todolists-api";
import {setIsLoggedIn} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


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
        setAppInitialized(state,action:PayloadAction<{isInitialized:boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }

    }
})

export const appReducer = slice.reducer
export const {setAppStatus,setAppError,setAppInitialized} = slice.actions

export const initializeApp = () => (dispatch:Dispatch) => {
    authApi.me()
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(setIsLoggedIn({isLoggedIn:true}))
            }else {

            }
            dispatch(setAppInitialized({isInitialized:true}))
        })
}

export type appErrorACType = ReturnType<typeof setAppError>
export type appStatusACType = ReturnType<typeof setAppStatus>

