import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi} from "../api/todolists-api";
import {Dispatch} from "redux";


export type removeTaskACType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
export type addTaskACType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

export type changeTaskStatusACType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string,
    status:TaskStatuses,
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
    | changeTaskStatusACType
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
            const newTask:TaskType = {id: v1(),
                title: action.title,
                status:TaskStatuses.New,
                todoListId:action.todolistId,
                description:'',
                startDate:'',
                deadline:'',
                addedDate:'',
                order:0,
                priority:TaskPriorities.Low
            }

            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el,status:action.status} : el)
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
            return {...state, [action.todolistId]: []}
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

export const addTaskAC = (todolistId: string, title: string): addTaskACType => {
    return {
        type: 'ADD-TASK',
        todolistId,
        title
    }
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status:TaskStatuses): changeTaskStatusACType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistId,
        taskId,
        status
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
