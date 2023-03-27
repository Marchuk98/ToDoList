import axios from "axios";

const settings = {
    withCredentials: true,
    header: {
        "API-KEY": "1fa14c67-71e4-4f59-9324-9f56be671b29"
    }
}

const instance = axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export const todolistsApi = {
    getTodolist() {
        return  instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return  instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
    },
    deleteTodolist(id: string) {
        return  instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return  instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId: string) {
        return  instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string,taskId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string,title:string){
        return  instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`, {title:title})
    },
    updateTask(todolistId:string, taskId:string, model:UpdateTaskModelType){
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}