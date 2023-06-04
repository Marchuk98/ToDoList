import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {combineReducers, legacy_createStore,applyMiddleware,AnyAction} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth:authReducer
})

export const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(thunk)
    }
)



export type AppRootState = ReturnType<typeof rootReducer>

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

type ThunkDispatchType = ThunkDispatch<AppRootState, any , AnyAction>

export const useAppDispatch = () =>  useDispatch<ThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector


// @ts-ignore
window.store = store;