import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODO-LIST"
    title: string
    todolistId:string
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

const initialState:TodoListType[] = []

export const todolistsReducer = (state: TodoListType[] = initialState, action: ActionType): TodoListType[] => {
    switch (action.type) {

        case "REMOVE-TODOLIST": {

            return state.filter(el => el.id !== action.id)
        }
        case "ADD-TODO-LIST" : {
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
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
        default: return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const addTodolistAC = (newTitle: string):AddTodolistActionType => {
    return {
        type: 'ADD-TODO-LIST',
        title: newTitle,
        todolistId:v1()
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