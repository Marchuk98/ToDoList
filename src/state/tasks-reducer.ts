import {TasksStateType} from "../AppWithReducers";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";


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
    isDone: boolean,
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


type ActionType =
    removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | RemoveTodolistActionType
    | editSpanACType
    | AddTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
                    ? {...el, isDone: action.isDone} : el)
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
        default:
            return state
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

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): changeTaskStatusACType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistId,
        taskId,
        isDone
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
