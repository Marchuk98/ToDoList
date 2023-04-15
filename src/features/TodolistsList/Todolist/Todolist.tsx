import React, {useCallback, useEffect} from "react";
import {FilterValuesType} from "../todolists-reducer";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import IconButton from '@mui/material/IconButton/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {useAppDispatch} from "../../../app/store";
import {getTasksTC} from "../tasks-reducer";


type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, status:TaskStatuses) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    filter:  FilterValuesType
    removeTodolist: (todolistId: string) => void
    editSpan: (todolistId: string, taskId: string, newTask: string) => void
    editTodo: (todolistId: string, newTask: string) => void
}
export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('Todolist is called')

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTasksTC(props.todolistId));
    }, []);

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId,title);
    }, [props.addTask, props.todolistId])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistId);
    },[props.removeTodolist,props.todolistId])

    const changeTodolistTitle = useCallback((title: string) => {
        props.editTodo(props.todolistId, title);
    },[props.editTodo,props.todolistId])

    const onAllClickHandler = useCallback(() => props.changeFilter( props.todolistId,"all"),[props.changeFilter,props.todolistId])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId,"active"),[props.changeFilter,props.todolistId])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId,"completed"),[props.changeFilter,props.todolistId])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }
    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} callBack={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm callBack={addTask}/>
            </div>
            <div>
                {
                    tasksForTodolist.map(el => {
                        return (
                            <Task key={el.id}
                                  task={el}
                                  changeStatus={props.changeStatus}
                                  editSpan={props.editSpan}
                                  todolistId={props.todolistId}
                                  removeTask={props.removeTask}
                            />
                        )
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'active' ? "contained" : "text"} color={"primary"} onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? "contained" : "text"} color={"secondary"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>

    );
})
