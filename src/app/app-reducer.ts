import {EntityStatusType} from "../features/TodolistsList/todolists-reducer";
import {Dispatch} from "redux";
import {authApi} from "../api/todolists-api";
import {setIsLoggedIn} from "../features/Login/auth-reducer";

export type initialStateType = {
    status: EntityStatusType
    error: string | null
    initialized:boolean
}

const initialState:initialStateType = {
    status: 'idle',
    error: null,
    initialized:false
}

export const appReducer = (state=initialState, action:ActionType):initialStateType => {
    switch (action.type){
        case "APP/SET-STATUS":{
            return {...state, status:action.status}
        }
        case "APP/SET-ERROR": {
            return {...state,error:action.error}
        }
        case "APP/SET-INITIALIZED":{
            return {...state,initialized:action.value}
        }
        default: return state
    }
}

export type appStatusACType = ReturnType<typeof setAppStatusAC>;
export type appErrorACType = ReturnType<typeof setAppErrorAC>;
type ActionType =
    | appStatusACType
    | appErrorACType
    | ReturnType<typeof setAppInitialized>



export const setAppStatusAC = (status:EntityStatusType) => ({type: "APP/SET-STATUS", status}as const)
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error}as const)
export const setAppInitialized = (value:boolean) => ({type: "APP/SET-INITIALIZED",value}as const)


export const initializeApp = () => (dispatch:Dispatch) => {
    authApi.me()
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(setIsLoggedIn(true))
            }else {

            }
            dispatch(setAppInitialized(true))
        })
}