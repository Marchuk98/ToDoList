import {todolistsApi, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";

export const REMOVE_TODOLIST = "REMOVE_TODOLIST"
export const ADD_TODO_LIST = "ADD_TODO_LIST"
const EDIT_TODO = "EDIT_TODO"
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"
export const SET_TODOLISTS = "SET_TODOLISTS"

const initialState: TodolistDomainType[] = []

export type FilterValuesType = "all" | "completed" | "active"
export type EntityStatusType = 'idle' | 'loading' | 'failed' | 'succeeded'

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
}


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {

        case REMOVE_TODOLIST: {

            return state.filter(el => el.id !== action.todolistId)
        }
        case ADD_TODO_LIST : {
            return [{...action.todolist, filter: "all"}, ...state]
        }
        case EDIT_TODO: {
            return state.map(el => el.id === action.todolistId ? {...el, title: action.newTask} : el)
        }
        case CHANGE_TODOLIST_TITLE: {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case CHANGE_TODOLIST_FILTER: {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        case SET_TODOLISTS: {
            return action.todolists.map(el => ({...el,filter:'all'}))
        }
        default:
            return state
    }
}

//action
export const removeTodolistAC = (todolistId: string) => ({ type: REMOVE_TODOLIST, todolistId}) as const
export const addTodolistAC = (todolist: TodoListType) => ({ type: ADD_TODO_LIST, todolist}) as const
export const changeTodolistTitleAC = (id: string, title: string) => ({type: CHANGE_TODOLIST_TITLE,id,title}) as const
export const editTodoAC = (todolistId: string, newTask: string) => ({type: EDIT_TODO,todolistId,newTask}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: CHANGE_TODOLIST_FILTER,id, filter}) as const
export const setTodolistAC = (todolists: TodoListType[]) => ({  type: SET_TODOLISTS, todolists})  as const


//thunk
export const getTodolistsTC = () => {
    return (dispatch: Dispatch<ActionType>) => {
        todolistsApi.getTodolist()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodolistTC = (newTitle: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        todolistsApi.createTodolist(newTitle)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const editTodoTC = (todolistId: string, newTask: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        todolistsApi.updateTodolist(todolistId, newTask)
            .then((res) => {
                dispatch(editTodoAC(todolistId, newTask))
            })
    }
}


//types
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type setTodolistACType = ReturnType<typeof setTodolistAC>

export type ActionType =
    | ReturnType<typeof removeTodolistAC>
    | addTodolistACType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof editTodoAC>
    | ReturnType<typeof setTodolistAC>