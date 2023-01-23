import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


type TodolistPropsType = {
    title: string
    // tasks: Array<TaskType>
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus:(taskId: string, isDone: boolean) => void
    filter:FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState('');

    let [error , setError] = useState<string | null >(null)



    const addTaskHandler = () => {
        if(newTaskTitle.trim() !== ""){
       props.addTask(newTaskTitle.trim());
       setNewTaskTitle("")
        }else {
            setError('task is required')
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if(e.key === 'Enter'){
            addTaskHandler();
        }
    }

    const onMainChangeFilter = (value:FilterValuesType) => {
            props.changeFilter(value);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyPressHandler}
                    className={error ?'error' : ""}
                />
                <button onClick={addTaskHandler}>+</button>
                {error &&  <div className= 'error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(el => {
                        const onRemoveHandler = () => props.removeTask(el.id);
                        const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(el.id , e.currentTarget.checked)
                        }
                        return(
                        <li key={el.id}  className={el.isDone ? "is-Done" : ""}>
                            <button onClick={onRemoveHandler}>X</button>
                            <input type="checkbox" onChange={onChangeInputHandler} checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )})
                }
            </ul>
            <div>
                <button className={props.filter === 'all'? "active-filter": ""} onClick={()=> {onMainChangeFilter('all')}}>All</button>
                <button className={props.filter === 'active'? "active-filter": ""} onClick={()=> {onMainChangeFilter('active')}}>Active</button>
                <button className={props.filter === 'completed'? "active-filter": ""} onClick={()=> {onMainChangeFilter('completed')}}>Completed</button>
            </div>
        </div>


    );
}


