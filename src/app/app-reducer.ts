import {EntityStatusType} from "../features/TodolistsList/todolists-reducer";

export type initialStateType = {
    status: EntityStatusType
    error: string | null
}

const initialState:initialStateType = {
    status: 'idle',
    error: "Some error"
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

type ActionType =
    | appStatusACType
    | appErrorStatusACType


type appStatusACType = ReturnType<typeof appStatusAC>

export const appStatusAC = (status:EntityStatusType) => ({type: "APP/SET-STATUS", status}as const)

type appErrorStatusACType = ReturnType<typeof appErrorStatusAC>

export const appErrorStatusAC = (error: string | null) => ({type: "APP/SET-ERROR", error}as const)