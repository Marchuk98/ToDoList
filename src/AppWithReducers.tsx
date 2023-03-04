import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import SuperInput from "./components/SuperInput";
import IconButton from '@mui/material/IconButton';
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    editTodoAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, editSpanAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active"

export type TodoListType = {
    id: string
    title: string
    filter: string | FilterValuesType
}

export type TasksStateType = {
    [key:string]:TaskType[];
}

function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }

    function removeTask(todolistId: string, id: string) {
        dispatchToTasksReducer(removeTaskAC(todolistId,id))
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatchToTasksReducer(changeTaskStatusAC(todolistId,taskId,isDone))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchToTasksReducer(addTaskAC(todolistId,title))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatchToTodolistReducer(changeTodolistFilterAC(todolistId,value))
    }

    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
    }

    const editSpan = (todolistId: string, taskId: string, newTask: string) => {
        dispatchToTasksReducer(editSpanAC(todolistId,taskId,newTask))
    }

    const editTodo = (todolistId: string, newTask: string) => {
       dispatchToTodolistReducer(editTodoAC(todolistId,newTask))
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <SuperInput callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        let tasksForTodolist = tasks[el.id];
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }
                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        return (<Grid item key={el.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={el.id}
                                              todolistId={el.id}
                                              title={el.title}
                                              removeTodolist={removeTodolist}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeStatus={changeStatus}
                                              filter={el.filter}
                                              editSpan={editSpan}
                                              editTodo={editTodo}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;