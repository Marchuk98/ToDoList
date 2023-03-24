import React, {useCallback} from "react";
import {FilterValuesType} from "./AppWithRedux";
import EditableSpan from "./components/EditableSpan";
import SuperInput from "./components/SuperInput";
import IconButton from '@mui/material/IconButton/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {Task} from "./components/Task";


type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    filter: string | FilterValuesType
    removeTodolist: (todolistId: string) => void
    editSpan: (todolistId: string, taskId: string, newTask: string) => void
    editTodo: (todolistId: string, newTask: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = React.memo((props: TodolistPropsType) => {

    console.log('Todolist is called')

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
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
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
                <SuperInput callBack={addTask}/>
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
