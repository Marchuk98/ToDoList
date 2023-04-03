import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
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
    editTodoAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, editSpanAC, removeTaskAC} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";


export type TasksStateType = {
    [key: string]: TaskType[];
}

function AppWithRedux() {

    console.log('App is called')

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    },[dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, status:TaskStatuses) => {
        const action = changeTaskStatusAC(todolistId, taskId, status)
        dispatch(action)
    },[dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        const action = addTaskAC(todolistId, title)
        dispatch(action)
    },[dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const addTodolist = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }, [dispatch])

    const editSpan = useCallback((todolistId: string, taskId: string, newTask: string) => {
        const action = editSpanAC(todolistId, taskId, newTask)
        dispatch(action)
    },[dispatch])

    const editTodo = useCallback((todolistId: string, newTask: string) => {
        dispatch(editTodoAC(todolistId, newTask))
    }, [dispatch])


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
                        return (<Grid item key={el.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={el.id}
                                              todolistId={el.id}
                                              title={el.title}
                                              removeTodolist={removeTodolist}
                                              tasks={tasks[el.id]}
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

export default AppWithRedux;