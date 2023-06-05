import {todolistsApi, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {appErrorACType, appStatusACType, setAppStatus} from "../../app/app-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodoLists} from "../../common/actions/actions";
import {action} from "@storybook/addon-actions";

export const REMOVE_TODOLIST = "REMOVE_TODOLIST"
export const ADD_TODO_LIST = "ADD_TODO_LIST"
export const SET_TODOLISTS = "SET_TODOLISTS"


const initialState: TodolistDomainType[] = []

export type FilterValuesType = "all" | "completed" | "active"
export type EntityStatusType = 'idle' | 'loading' | 'failed' | 'succeeded'

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus:EntityStatusType
}


const slise = createSlice({
    name:"todolist",
    initialState,
    reducers:{
        removeTodolistAC(state,action:PayloadAction<{todolistId: string}>){
           const index = state.findIndex(el =>  el.id === action.payload.todolistId)
            if(index > -1){
                state.splice(index,1);
            }
        },
        addTodolistAC(state,action:PayloadAction<{todolist: TodoListType}>){
            state.unshift({...action.payload.todolist, filter: "all",entityStatus:'idle'})
        },
        changeTodolistTitleAC(state,action:PayloadAction<{id: string, title: string}>) {
            const index = state.findIndex(el=> el.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state,action:PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = state.findIndex(el=> el.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state,action:PayloadAction<{id: string, status:EntityStatusType}>) {
            const index = state.findIndex(el=> el.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistAC(state,action:PayloadAction<{todolists: TodoListType[]}>) {
            return action.payload.todolists.map(el => ({...el,filter:'all',entityStatus:'idle'}))
        },
    },
    extraReducers:builder => {
        builder
            .addCase(clearTasksAndTodoLists,()=> {
                return []
            })
    }
})
export const todolistsReducer = slise.reducer
export const todolistActions = slise.actions
export const {removeTodolistAC,addTodolistAC,changeTodolistTitleAC,changeTodolistFilterAC,changeTodolistEntityStatusAC,setTodolistAC} = slise.actions

//thunk
export const getTodolistsTC = () => {
    return (dispatch:Dispatch) => {
        dispatch(setAppStatus({status:'loading'}))
        todolistsApi.getTodolist()
            .then((res) => {
                dispatch(setTodolistAC({todolists:res.data}))
                dispatch(setAppStatus({status:'succeeded'}))
            })
            .catch((error)=> {
                handleServerAppError(error,dispatch);
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status:'loading'}))
        dispatch(changeTodolistEntityStatusAC({ id:todolistId, status:'loading'}))
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC({todolistId:todolistId}))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}

export const addTodolistTC = (newTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status:'loading'}))
        todolistsApi.createTodolist(newTitle)
            .then((res) => {
                dispatch(addTodolistAC({todolist:res.data.data.item}))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, newTask: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus({status:'loading'}))
        todolistsApi.updateTodolist(todolistId, newTask)
            .then((res) => {
                dispatch(changeTodolistTitleAC( {id:todolistId,title:newTask}))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}


//types
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type setTodolistACType = ReturnType<typeof setTodolistAC>



type ThunkDispatch = Dispatch< appStatusACType | appErrorACType >