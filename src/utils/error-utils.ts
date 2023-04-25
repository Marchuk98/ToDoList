import {appErrorACType, appStatusACType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<appErrorACType | appStatusACType >) => {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
    } else{
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkAppError = (error: { message:string }, dispatch: Dispatch<appErrorACType | appStatusACType >) => {
    dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
    dispatch(setAppStatusAC('failed'))
}