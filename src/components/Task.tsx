import React, {useCallback} from 'react';
import IconButton from "@mui/material/IconButton/IconButton";
import Delete from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from "./EditableSpan";
import {TaskType} from "../Todolist";
import {useDispatch} from "react-redux";
import {removeTaskAC} from "../state/tasks-reducer";

type TaskPropsType = {
    task:TaskType
    todolistId:string
    changeStatus:(todolistId: string, taskId: string, isDone: boolean)=> void
    editSpan: (todolistId: string, taskId: string, newTask: string) => void
}

export const Task = React.memo((props:TaskPropsType) => {

    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        const action = removeTaskAC(props.todolistId, props.task.id)
        dispatch(action)
    },[dispatch])


    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        props.changeStatus(props.todolistId, taskId, isDone);
    },[props.changeStatus,props.todolistId])

    const changeTaskTitle = useCallback((taskId: string, newTask: string) => {
        props.editSpan(props.todolistId,taskId, newTask);
    },[props.editSpan,props.todolistId])

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-Done" : ""}>
            <Checkbox
                color={"success"}
                onChange={(e)=>changeTaskStatus(props.task.id, e.currentTarget.checked)}
                checked={props.task.isDone}/>
            <EditableSpan
                title={props.task.title}
                callBack={(newTask)=>changeTaskTitle(props.task.id,newTask)}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
});

