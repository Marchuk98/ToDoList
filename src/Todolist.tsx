import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import EditableSpan from "./components/EditableSpan";
import SuperInput from "./components/SuperInput";
import IconButton from '@mui/material/IconButton/IconButton';
import Delete from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";


type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
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
export const Todolist = (props: TodolistPropsType) => {

    const onMainChangeFilter = (value: FilterValuesType) => {
        props.changeFilter(props.todolistId, value);
    }

    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const UniversalCallbackInputHandler = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }

    const editableTodolistSpanHandler = (newTask: string) => {
        props.editTodo(props.todolistId, newTask)
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
                <SuperInput callBack={UniversalCallbackInputHandler}/>
            </div>
            <div>
                {
                    props.tasks.map(el => {

                        const onRemoveHandler = () => props.removeTask(props.todolistId, el.id);

                        const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(props.todolistId, el.id, e.currentTarget.checked)
                        }

                        const UniversalEditableSpanHandler = (newTitle: string) => {
                            props.editSpan(props.todolistId, el.id, newTitle)
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

