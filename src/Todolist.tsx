import React from "react";
import {FilterValuesType} from "./App";


type TodolistPropsType = {
    title: string
    // tasks: Array<TaskType>
    tasks: TaskType[]
    removeTask: (id:number) => void
    changeFilter:(value: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>

                <button onClick={() => {props.removeTask(el.id)}}></button>

                </li>
                )}

            </ul>
            <div>
                <button onClick={()=>{props.changeFilter("all")}}>All</button>
                <button onClick={()=>{props.changeFilter("active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>


    );
}


