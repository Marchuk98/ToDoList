import {Dispatch} from "redux";
import {authApi, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "../../app/app-reducer";


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setIsLoggedIn(state,action:PayloadAction<{isLoggedIn:boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions


export const login = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    authApi.login(data)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedIn({isLoggedIn:true}))
                dispatch(setAppStatus({status:"succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerAppError(error, dispatch);
        })
}

export const logout = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    authApi.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedIn({isLoggedIn:false}))
                dispatch(setAppStatus({status:"succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerAppError(error, dispatch);
        })
}