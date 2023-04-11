import {TasksStateType} from "../app/App";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";
import {
    ADD_TODO_LIST,
    addTodolistACType,
    REMOVE_TODOLIST,
    removeTodolistACType, SET_TODOLISTS,
    setTodolistACType
} from "./todolists-reducer";

const REMOVE_TASK = "REMOVE_TASK"
const ADD_TASK = "ADD_TASK"
const UPDATE_TASK = "UPDATE_TASK"
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE"
const SET_TASK = "SET_TASK"

const initialState:TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {...state, [action.todolistId] : state[action.todolistId].filter(el => el.id !== action.taskId)}
        }
        case ADD_TASK: {
            return {...state,[action.task.todoListId]:[...state[action.task.todoListId],action.task]}
        }
        case UPDATE_TASK: {
            return {...state, [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el,...action.model} : el)}
        }
        case CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, title: action.title} : el)
            }
        }
        case ADD_TODO_LIST: {
            return {...state, [action.todolist.id]: []}
        }
        case REMOVE_TODOLIST: {
            const stateCopy = {...state};
            delete stateCopy [action.todolistId]
            return stateCopy;
        }
        case SET_TODOLISTS:{
            return {...state, ...action.todolists.reduce((acc, el) => ({...acc, [el.id]: []}), {})}
        }
        case SET_TASK:{
            return {...state,[action.todolistId]:action.tasks}
        }
        default:return state
    }
}

//action
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: REMOVE_TASK,todolistId,taskId}) as const
export const addTaskAC = (task:TaskType) => ({type: ADD_TASK,task}) as const
export const updateTaskAC = (todolistId: string, taskId: string, model:UpdateDomainTaskModelType) => ({  type: UPDATE_TASK,todolistId,taskId,model}) as const
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: CHANGE_TASK_TITLE, taskId,title,todolistId,}) as const
export const setTaskAC = (todolistId:string,tasks:TaskType[]) => ({ type: SET_TASK, todolistId, tasks}) as const


//thunk
export const getTasksTC = (todolistId:string) => {
    return (dispatch:Dispatch<ActionType>)=>{
        todolistsApi.getTasks(todolistId)
            .then((res)=>{
                dispatch(setTaskAC(todolistId,res.data.items))
            })
    }
}

export const removeTasksTC = (todolistId: string, taskId: string) => {
    return (dispatch:Dispatch<ActionType>)=>{
        todolistsApi.deleteTask(todolistId,taskId)
            .then((res)=>{
                dispatch(removeTaskAC(todolistId,taskId))
            })
    }
}

export const addTasksTC = (todolistId: string, title: string) => {
    return (dispatch:Dispatch<ActionType>)=>{
        todolistsApi.createTask(todolistId,title)
            .then((res)=>{
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel:UpdateDomainTaskModelType) => {
    return (dispatch:Dispatch<ActionType>,getState: ()=> AppRootState)=>{
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
                dispatch(updateTaskAC(todolistId,taskId,domainModel))
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

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | removeTodolistACType
    | addTodolistACType
    | setTodolistACType
    | ReturnType<typeof setTaskAC>