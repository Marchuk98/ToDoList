import {TasksStateType} from "../../app/App";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {
    ADD_TODO_LIST, addTodolistAC,
    addTodolistACType,
    REMOVE_TODOLIST,
    removeTodolistACType, SET_TODOLISTS,
    setTodolistACType, todolistActions
} from "./todolists-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../utils/error-utils";
import {appErrorACType, appStatusACType, setAppStatus} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState:TasksStateType = {}

const slice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        removeTaskAC:(state, action:PayloadAction<{todolistId: string, taskId: string}>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            if(index > -1){
                state[action.payload.todolistId].splice(index,1)
            }
        },
        addTaskAC(state,action:PayloadAction<{task:TaskType}>){
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        },
        updateTaskAC(state,action:PayloadAction<{todolistId: string, taskId: string, model:UpdateDomainTaskModelType}>){
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el=> el.id === action.payload.taskId)
                if(index > -1){
                    tasks[index] = {...tasks[index],...action.payload.model}
                }
        },
        changeTaskTitleAC(state,action:PayloadAction<{taskId: string, title: string, todolistId: string}>){
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el=> el.id === action.payload.taskId)
            tasks[index].title = action.payload.title
        },
        setTaskAC(state,action:PayloadAction<{todolistId:string,tasks:TaskType[]}>){
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers:builder => {
        builder
            .addCase(todolistActions.addTodolistAC, (state,action)=> {
                state[action.payload.todolist.id] = []
        })
            .addCase(todolistActions.removeTodolistAC,(state, action)=>{
                delete state[action.payload.todolistId]
            })
            .addCase(todolistActions.setTodolistAC,(state, action)=>{
                action.payload.todolists.forEach(el=> {state[el.id] = []})
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions

//thunk
export const getTasksTC = (todolistId:string) => {
    return (dispatch:Dispatch)=>{
        dispatch(setAppStatus({status:'loading'}))
        todolistsApi.getTasks(todolistId)
            .then((res)=>{
                dispatch(tasksAction.setTaskAC({todolistId, tasks:res.data.items}))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}

export const removeTasksTC = (todolistId: string, taskId: string) => {
    return (dispatch:Dispatch)=>{
        dispatch(setAppStatus({status:'loading'}))
        todolistsApi.deleteTask(todolistId,taskId)
            .then((res)=>{
                dispatch(tasksAction.removeTaskAC({todolistId,taskId}))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}

export const addTasksTC = (todolistId: string, title: string) => {
    return (dispatch:Dispatch)=>{
        dispatch(setAppStatus({status:'loading'}))
        todolistsApi.createTask(todolistId,title)
            .then((res)=>{
                if(res.data.resultCode === 0){
                    dispatch(tasksAction.addTaskAC({task:res.data.data.item}))
                    dispatch(setAppStatus({status:'succeeded'}))
                }else{
                    handleServerAppError(res.data,dispatch)
                }

            })
            .catch((error)=>{
                handleServerNetworkAppError(error,dispatch)
            })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel:UpdateDomainTaskModelType) => {
    return (dispatch:Dispatch,getState: ()=> AppRootState)=>{
        dispatch(setAppStatus({status:'loading'}))
        const state = getState()
       const task = state.tasks[todolistId].find(el=> el.id === taskId)
        if(!task){
            console.warn("Task not found in the state")
            return;
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todolistsApi.updateTask(todolistId,taskId,apiModel)
            .then((res)=>{
                if(res.data.resultCode === 0){
                    dispatch(tasksAction.updateTaskAC({todolistId,taskId,model:domainModel}))
                    dispatch(setAppStatus({status:'succeeded'}))
                }else {
                    handleServerAppError(res.data,dispatch)
                }
            })
            .catch((error)=>{
                handleServerNetworkAppError(error,dispatch)
            })
    }
}


//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
