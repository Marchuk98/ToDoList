import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./Todolist";


export type FilterValuesType = "all" | "completed" | "active"

function App() {


    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ]);


    let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(id: string) {

        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    const addTask = (title:string) => {
        let mewTask = {id: v1(), title: title, isDone: false}
        let newTasks = [mewTask, ...tasks];
        setTasks(newTasks);
    }


    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


    return (
        <div className="App">

            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
