import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./AppWithRedux";
import EditableSpan from "./components/EditableSpan";
import SuperInput from "./components/SuperInput";
import IconButton from '@mui/material/IconButton/IconButton';
import Delete from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import {addTaskAC, changeTaskStatusAC, editSpanAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


type TodolistPropsType = {
    todolistId: string
    title: string
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    filter: string | FilterValuesType
    removeTodolist: (todolistId: string) => void
    editTodo: (todolistId: string, newTask: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {

    const dispatch = useDispatch()

    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todolistId])

    const onMainChangeFilter = (value: FilterValuesType) => {
        props.changeFilter(props.todolistId, value);
    }

    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(props.todolistId, title))
    }

    const editableTodolistSpanHandler = (newTask: string) => {
        props.editTodo(props.todolistId, newTask)
    }

    let tasksForTodolist = tasks;
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }
    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} callBack={editableTodolistSpanHandler}/>
                    <IconButton onClick={onClickRemoveTodolistHandler}>
                        <Delete/>
                    </IconButton>
                </h3>
                <SuperInput callBack={addTask}/>
            </div>
            <div>
                {
                    tasksForTodolist.map(el => {

                        const onRemoveHandler = () =>  dispatch(removeTaskAC(props.todolistId, el.id))

                        const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(props.todolistId, el.id, e.currentTarget.checked))
                        }

                        const UniversalEditableSpanHandler = (newTitle: string) => {
                            dispatch(editSpanAC(props.todolistId, el.id, newTitle))
                        }
                        return (
                            <div key={el.id} className={el.isDone ? "is-Done" : ""}>
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                                <Checkbox color={"success"} onChange={onChangeInputHandler} checked={el.isDone}/>
                                <EditableSpan title={el.title} callBack={UniversalEditableSpanHandler}/>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"} onClick={() => {
                    onMainChangeFilter('all')
                }}>All
                </Button>
                <Button variant={props.filter === 'active' ? "contained" : "text"} color={"primary"} onClick={() => {
                    onMainChangeFilter('active')
                }}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? "contained" : "text"} color={"secondary"}
                        onClick={() => {
                            onMainChangeFilter('completed')
                        }}>Completed
                </Button>
            </div>
        </div>

    );
}

