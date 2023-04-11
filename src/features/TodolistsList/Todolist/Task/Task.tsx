import React, {ChangeEvent, useCallback} from 'react';
import IconButton from "@mui/material/IconButton/IconButton";
import Delete from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses,TaskType} from "../../../../api/todolists-api";

type TaskPropsType = {
    task:TaskType
    todolistId:string
    changeStatus:(todolistId: string, taskId: string, status:TaskStatuses)=> void
    editSpan: (todolistId: string, taskId: string, newTask: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}

export const Task = React.memo((props:TaskPropsType) => {

    const removeTask = useCallback(() => {
        props.removeTask(props.todolistId,props.task.id)
    },[props.removeTask,props.todolistId])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.todolistId,props.task.id,newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
    },[props.changeStatus,props.todolistId])

    const changeTaskTitle = useCallback((taskId: string, newTask: string) => {
        props.editSpan(props.todolistId,taskId, newTask);
    },[props.editSpan,props.todolistId])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-Done" : ""}>
            <Checkbox
                color={"success"}
                onChange={changeTaskStatus}
                checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan
                title={props.task.title}
                callBack={(newTask)=>changeTaskTitle(props.task.id,newTask)}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
});

