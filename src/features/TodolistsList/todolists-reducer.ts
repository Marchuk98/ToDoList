import {todolistsApi, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {appErrorACType, appStatusACType, setAppStatus} from "../../app/app-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
           const index = state.findIndex(el =>  el.id != action.payload.todolistId)
            if(index > -1){
                state.splice(index,-1);
            }
        },
        addTodolistAC(state,action:PayloadAction<{todolist: TodoListType}>){
            state.push({...action.payload.todolist, filter: "all",entityStatus:'idle'}, ...state)
        },
        changeTodolistTitleAC(state,action:PayloadAction<{id: string, title: string}>) {
            const index = state.findIndex(el=> el.id === action.payload.id)
            state[index].title = action.payload.title
        },
        editTodoAC(state,action:PayloadAction<{todolistId: string, newTask: string}>){

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
    }
})
export const todolistsReducer = slise.reducer
export const {removeTodolistAC,addTodolistAC,changeTodolistTitleAC,editTodoAC,changeTodolistFilterAC,changeTodolistEntityStatusAC,setTodolistAC} = slise.actions

// export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
//     switch (action.type) {
//
//         case REMOVE_TODOLIST: {
//
//             return state.filter(el => el.id !== action.todolistId)
//         }
//         case ADD_TODO_LIST : {
//             return [{...action.todolist, filter: "all",entityStatus:'idle'}, ...state]
//         }
//         case EDIT_TODO: {
//             return state.map(el => el.id === action.todolistId ? {...el, title: action.newTask} : el)
//         }
//         case CHANGE_TODOLIST_ENTITY_STATUS: {
//             return state.map(el => el.id === action.id ? {...el, status:action.status} : el)
//         }
//         case CHANGE_TODOLIST_TITLE: {
//             return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
//         }
//         case CHANGE_TODOLIST_FILTER: {
//             return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
//         }
//         case SET_TODOLISTS: {
//             return action.todolists.map(el => ({...el,filter:'all',entityStatus:'idle'}))
//         }
//         default:
//             return state
//     }
// }

//action

//thunk
export const getTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
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
    return (dispatch: Dispatch<ActionType>) => {
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
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatus({status:'loading'}))
        todolistsApi.createTodolist(newTitle)
            .then((res) => {
                dispatch(addTodolistAC({todolist:res.data.data.item}))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}

export const editTodoTC = (todolistId: string, newTask: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatus({status:'loading'}))
        todolistsApi.updateTodolist(todolistId, newTask)
            .then((res) => {
                dispatch(editTodoAC( {todolistId:todolistId, newTask}))
                dispatch(setAppStatus({status:'succeeded'}))
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
    | appErrorACType
    | appStatusACType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof editTodoAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

type ThunkDispatch = Dispatch<ActionType | appStatusACType | appErrorACType >