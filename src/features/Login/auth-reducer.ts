import {Dispatch} from "redux";
import {appErrorACType, appStatusACType, setAppStatusAC} from "../../app/app-reducer";
import {authApi, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/error-utils";

type InitialStateType = {
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}


type ActionType = |ReturnType<typeof setIsLoggedIn>
export const setIsLoggedIn = (value: boolean) => ({type: "login/SET-IS-LOGGED-IN", value}) as const


export const login = (data: LoginParamsType) => (dispatch: Dispatch<ActionType | appStatusACType | appErrorACType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerAppError(error, dispatch);
        })
}

export const logout = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerAppError(error, dispatch);
        })
}