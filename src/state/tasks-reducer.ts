import {TasksStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";


export type removeTaskACType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
export type addTaskACType = {
    type: "ADD-TASK"
    task:TaskType
}

export type updateTaskACType = {
    type: "UPDATE-TASK"
    taskId: string,
    model:UpdateDomainTaskModelType,
    todolistId: string
}
export type changeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string,
    title: string,
    todolistId: string
}
export type editSpanACType = {
    type: "EDIT-SPAN"
    todolistId: string,
    taskId: string,
    newTask: string
}

export type setTaskTypeACType = {
    type: "SET-TASK"
    tasks:TaskType[]
    todolistId:string
}


type ActionType =
    removeTaskACType
    | addTaskACType
    | updateTaskACType
    | changeTaskTitleACType
    | RemoveTodolistActionType
    | editSpanACType
    | AddTodolistActionType
    | SetTodolistsActionType
    | setTaskTypeACType



const initialState:TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        }
        case "ADD-TASK": {
            return {...state,[action.task.todoListId]:[...state[action.task.todoListId],action.task]}
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el,...action.model} : el)
            }
        }
        case "EDIT-SPAN": {
            return {...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.newTask
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, title: action.title} : el)
            }
        }
        case "ADD-TODO-LIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy [action.id]
            return stateCopy;
        }
        case "SET-TODOLISTS":{

            return {...state, ...action.todolists.reduce((acc, el) => ({...acc, [el.id]: []}), {})}
        }
        case "SET-TASK":{
            return {...state,[action.todolistId]:action.tasks}
        }
        default:return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): removeTaskACType => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    }
}

export const addTaskAC = (task:TaskType): addTaskACType => {
    return {
        type: 'ADD-TASK',
        task
    }
}

export const updateTaskAC = (todolistId: string, taskId: string, model:UpdateDomainTaskModelType): updateTaskACType => {
    return {
        type: 'UPDATE-TASK',
        todolistId,
        taskId,
        model
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleACType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistId,
    }
}

export const editSpanAC = (todolistId: string, taskId: string, newTask: string): editSpanACType => {
    return {
        type: "EDIT-SPAN",
        todolistId,
        taskId,
        newTask
    }
}

export const setTaskAC = (todolistId:string,tasks:TaskType[],):setTaskTypeACType => {
    return{
        type: "SET-TASK",
        todolistId,
        tasks
    }
}

export const getTasksTC = (todolistId:string) => {
    return (dispatch:Dispatch)=>{
        todolistsApi.getTasks(todolistId)
            .then((res)=>{
                dispatch(setTaskAC(todolistId,res.data.items))
            })
    }
}

export const removeTasksTC = (todolistId: string, taskId: string) => {
    return (dispatch:Dispatch)=>{
        todolistsApi.deleteTask(todolistId,taskId)
            .then((res)=>{
                dispatch(removeTaskAC(todolistId,taskId))
            })
    }
}

export const addTasksTC = (todolistId: string, title: string) => {
    return (dispatch:Dispatch)=>{
        todolistsApi.createTask(todolistId,title)
            .then((res)=>{
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}



export const updateTaskTC = (todolistId: string, taskId: string, domainModel:UpdateDomainTaskModelType) => {
    return (dispatch:Dispatch,getState: ()=> AppRootState)=>{
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