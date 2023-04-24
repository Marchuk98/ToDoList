import {EntityStatusType} from "../features/TodolistsList/todolists-reducer";

export type initialStateType = {
    status: EntityStatusType
    error: string | null
}

const initialState:initialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state=initialState, action:ActionType):initialStateType => {
    switch (action.type){
        case "APP/SET-STATUS":{
            return {...state, status:action.status}
        }
        case "APP/SET-ERROR": {
            return {...state,error:action.error}
        }
        default: return state
    }
}

export type appStatusACType = ReturnType<typeof setAppStatusAC>;
export type appErrorACType = ReturnType<typeof setAppErrorAC>;
type ActionType =
    | appStatusACType
    | appErrorACType



export const setAppStatusAC = (status:EntityStatusType) => ({type: "APP/SET-STATUS", status}as const)
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error}as const)