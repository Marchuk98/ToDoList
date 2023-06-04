import {appErrorACType, appStatusACType, setAppError, setAppStatus} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<appErrorACType | appStatusACType >) => {
    if(data.messages.length){
        dispatch(setAppError({error:data.messages[0]}))
    } else{
        dispatch(setAppError({error:'Some error occurred'}))
    }
    dispatch(setAppStatus({status:'failed'}))
}

export const handleServerNetworkAppError = (error: { message:string }, dispatch: Dispatch<appErrorACType | appStatusACType >) => {
    dispatch(setAppError({error:error.message ? error.message : "Some error occurred"}))
    dispatch(setAppStatus({status:'failed'}))
}