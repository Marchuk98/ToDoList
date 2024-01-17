import { TaskType } from "../../../../api/tasks/tasksApi.types";
import {useActions} from "../../../../../../common/hooks/useActions";
import {ChangeEvent} from "react";
import {TaskStatuses} from "../../../../../../common/enum/common.enums";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import s from './Task.module.css'
import {tasksThunk} from "../../../../model/tasks/taskSlice";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import {memo} from "react";

type PropsTaskType = {
    task: TaskType;
    todolistId: string;
};

export const Task = memo(({task, todolistId}: PropsTaskType)  => {

    const {removeTask, updateTask} = useActions(tasksThunk)

    const removeTaskHandler = () => {
        removeTask({taskId: task.id, todolistId: todolistId})
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ?TaskStatuses.Completed : TaskStatuses.New
        updateTask({taskId: task.id, domainModel: {status}, todolistId})
    }

    const changeTaskTitleHandler = (title: string) => {
        updateTask({taskId: task.id, domainModel: {title}, todolistId});
    }


    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ''}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="primary"
                      onChange={changeTaskStatusHandler}/>

            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
})