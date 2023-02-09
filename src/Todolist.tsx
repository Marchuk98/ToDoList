import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import EditableSpan from "./components/EditableSpan";
import SuperInput from "./components/SuperInput";

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
                    <button onClick={onClickRemoveTodolistHandler}>X</button>
                </h3>
                <SuperInput callBack={UniversalCallbackInputHandler}/>
            </div>
            <ul>
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
                            <li key={el.id} className={el.isDone ? "is-Done" : ""}>
                                <button onClick={onRemoveHandler}>X</button>
                                <input type="checkbox" onChange={onChangeInputHandler} checked={el.isDone}/>
                                <EditableSpan title={el.title} callBack={UniversalEditableSpanHandler}/>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""} onClick={() => {
                    onMainChangeFilter('all')
                }}>All
                </button>
                <button className={props.filter === 'active' ? "active-filter" : ""} onClick={() => {
                    onMainChangeFilter('active')
                }}>Active
                </button>
                <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={() => {
                    onMainChangeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>

    );
}

