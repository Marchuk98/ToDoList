import {todolistsApi, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODO-LIST"
    todolist:TodoListType
}
export type ChangeTodolistTitleActionType = { 
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type editTodoActionType ={
    type:"EDIT-TODO"
    todolistId: string,
    newTask: string
}

export type SetTodolistsActionType = {
    type: "SET-TODOLISTS"
    todolists:TodoListType[]
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | editTodoActionType
    | SetTodolistsActionType

const initialState:TodolistDomainType[] = []

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodoListType & {
    filter:FilterValuesType
}


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {

        case "REMOVE-TODOLIST": {

            return state.filter(el => el.id !== action.id)
        }
        case "ADD-TODO-LIST" : {
            const newTodolist:TodolistDomainType = {...action.todolist,filter:"all"}
            return [newTodolist,...state]
        }
        case "EDIT-TODO":{
            return state.map(el=> el.id === action.todolistId ? {...el, title:action.newTask}:el)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        case "SET-TODOLISTS":{
            return action.todolists.map(el=> {
                return{
                    ...el,
                    filter:'all'
                }
            })
        }
        default: return state
    }
}

export const removeTodolistAC = (todolistId:string ): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const addTodolistAC = (todolist: TodoListType):AddTodolistActionType => {
    return {
        type: 'ADD-TODO-LIST',
        todolist
    }
}
export const changeTodolistTitleAC = (id:string, title:string):ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id:id,
        title: title
    }
}

export const editTodoAC = (todolistId: string, newTask: string):editTodoActionType => {
        return{
            type:"EDIT-TODO",
            todolistId,
            newTask
        }
}

export const changeTodolistFilterAC = (id: string, filter:FilterValuesType):ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}
export const setTodolistAC = (todolists:TodoListType[]):SetTodolistsActionType => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    }
}

export const getTodolistsTC= () =>{
    return (dispatch:Dispatch) => {
        todolistsApi.getTodolist()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
            })
    }}

export const removeTodolistTC = (todolistId: string) =>{
    return (dispatch:Dispatch) => {
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }}

export const addTodolistTC = (newTitle: string) =>{
    return (dispatch:Dispatch) => {
        todolistsApi.createTodolist(newTitle)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }}

export const editTodoTC = (todolistId: string, newTask: string) =>{
    return (dispatch:Dispatch) => {
        todolistsApi.updateTodolist(todolistId,newTask)
            .then((res) => {
                dispatch(editTodoAC(todolistId,newTask))
            })
    }}