import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "78cf6079-7a35-4fcc-beb0-91f44a633a0e"
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
            todolistsApi.deleteTask(todolistId, taskId)
                .then((res) => {
                    setState(res.data)
                })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'TodolistId'} value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'TaskId'} value={taskId} onChange={(e)=> setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}


export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        todolistsApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'title-Task'} value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create Task</button>
        </div>
    </div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [todolistId,setTodolistId] = useState<string>('')
    const [taskId,setTaskId] = useState<string>('')
        const updateTask = () => {
        todolistsApi.updateTask(todolistId, taskId,{
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: title
        })
            .then((res) => {
                setState(res.data)
            })
        }
    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e)=> setTaskId(e.currentTarget.value)}/>
        <input placeholder={"title"} value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
        <input placeholder={"description"} value={description} onChange={(e)=>setDescription(e.currentTarget.value)}/>
        <input placeholder={"status"} value={status} onChange={(e)=>setStatus(+e.currentTarget.value)}/>
        <input placeholder={"priority"} value={priority} onChange={(e)=>setPriority(+e.currentTarget.value)}/>
        <input placeholder={"startDate"} value={startDate} onChange={(e)=>setStartDate(e.currentTarget.value)}/>
        <input placeholder={"deadline"} value={deadline} onChange={(e)=>setDeadline(e.currentTarget.value)}/>
        <button onClick={updateTask}>UpdateTask</button>
    </div>

    </div>
}