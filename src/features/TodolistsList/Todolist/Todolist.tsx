import React, {useCallback, useEffect} from "react";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
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
    todolist: TodolistDomainType
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, status:TaskStatuses) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    filter:  FilterValuesType
    removeTodolist: (todolistId: string) => void
    editSpan: (todolistId: string, taskId: string, newTask: string) => void
    editTodo: (todolistId: string, newTask: string) => void
    demo?:boolean
}
export const Todolist = React.memo(({demo = false,...props}: TodolistPropsType) => {
    console.log('Todolist is called')



    const dispatch = useAppDispatch();

    useEffect(() => {
        if(demo){
            return
        }
        dispatch(getTasksTC(props.todolist.id));
    }, []);

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id,title);
    }, [props.addTask, props.todolist.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolist.id);
    },[props.removeTodolist,props.todolist.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.editTodo(props.todolist.id, title);
    },[props.editTodo,props.todolist.id])

    const onAllClickHandler = useCallback(() => props.changeFilter( props.todolist.id,"all"),[props.changeFilter,props.todolist.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id,"active"),[props.changeFilter,props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id,"completed"),[props.changeFilter,props.todolist.id])

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
                    <EditableSpan title={props.todolist.title} callBack={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm callBack={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            </div>
            <div>
                {
                    tasksForTodolist.map(el => {
                        return (
                            <Task key={el.id}
                                  task={el}
                                  changeStatus={props.changeStatus}
                                  editSpan={props.editSpan}
                                  todolistId={props.todolist.id}
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
