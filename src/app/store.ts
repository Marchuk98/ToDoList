import {todolistsSlice} from "../features/TodolistsList/model/todolists/todolistsSlice";
import {taskSlice} from "../features/TodolistsList/model/tasks/taskSlice";
import {appSlice} from "./appSlice";
import {authSlice} from "../features/auth/model/authSlice";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        todolists: todolistsSlice,
        tasks: taskSlice,
        app: appSlice,
        auth:authSlice
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// @ts-ignore
window.store = store;