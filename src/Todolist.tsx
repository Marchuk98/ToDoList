import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


type TodolistPropsType = {
    title: string
    // tasks: Array<TaskType>
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist = (props: TodolistPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState('');
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
   
        if(e.key === 'Enter'){
            addTaskHandler();
        }


    }
    const addTaskHandler = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
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
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(el => {
                        const onRemoveHandler = () => props.removeTask(el.id);
                        return(
                        <li key={el.id}>
                            <button onClick={onRemoveHandler}>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )})
                }
            </ul>
            <div>
                <button onClick={()=> {onMainChangeFilter('all')}}>All</button>
                <button onClick={()=> {onMainChangeFilter('active')}}>Active</button>
                <button onClick={()=> {onMainChangeFilter('completed')}}>Completed</button>
            </div>
        </div>


    );
}


