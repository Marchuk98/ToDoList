import {TasksStateType} from "../App";
import {v1} from "uuid";
import {RemoveTodolistActionType} from "./todolist-reducer";


export type removeTaskACType = {
    type:"REMOVE-TASK"
    todolistId:string
    taskId:string
}
export type addTaskACType = {
    type:"ADD-TASK"
    title:string
    todolistId: string
}

export type changeTaskStatusACType = {
    type:"CHANGE-TASK-STATUS"
    taskId:string,
    statusTask:boolean,
    todolistId: string
}
export type changeTaskTitleACType = {
    type:'CHANGE-TASK-TITLE'
    taskId:string,
    title:string,
    todolistId: string
}
export type AddTodolistACType = {
    type:"ADD-TODO-LIST"
    title:string
    todolistId:string
}

type ActionType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | AddTodolistACType | RemoveTodolistActionType

export const tasksReducer = (state:TasksStateType, action:ActionType):TasksStateType => {
    switch (action.type){
        case "REMOVE-TASK": {
                return {...state,[action.todolistId]:state[action.todolistId].filter(el=> el.id !== action.taskId)}
        }
        case "ADD-TASK":{
            const newTask =   {id: v1(), title: action.title, isDone: false}
            return {...state,[action.todolistId]:[newTask,...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS":{
            return {...state,
                [action.todolistId]:state[action.todolistId].map(el=> el.id === action.taskId
                    ? {...el,isDone:action.statusTask}:el)}
        }
        case "CHANGE-TASK-TITLE":{
            return {...state,
                [action.todolistId]:state[action.todolistId].map(el=> el.id === action.taskId
                    ? {...el, title:action.title}:el)}
        }
        case "ADD-TODO-LIST":{
            return {...state,[action.todolistId]:[]}
        }
        case "REMOVE-TODOLIST":{
            // return {...state,delete [action.id]}
            const stateCopy = {...state};
            delete stateCopy [action.id]
            return stateCopy;
        }
        default: return state
    }
}

export const removeTaskAC = (taskId:string,todolistId: string): removeTaskACType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    }
}

export const addTaskAC = (title: string, todolistId: string):addTaskACType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    }
}

export const changeTaskStatusAC = (taskId:string, statusTask:boolean, todolistId: string):changeTaskStatusACType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        statusTask,
        todolistId
    }
}

export const changeTaskTitleAC = (taskId:string, title:string, todolistId: string):changeTaskTitleACType=>{
    return{
        type:'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistId,
    }
}

export const AddTodolistAC = (title:string):AddTodolistACType => {
    return {
        type:"ADD-TODO-LIST",
        title,
        todolistId:v1()
    }
}