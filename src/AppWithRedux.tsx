import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
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
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "completed" | "active"

export type TodoListType = {
    id: string
    title: string
    filter: string | FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[];
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodoListType[]>(state => state.todolists)

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }

    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }
    const editTodo = (todolistId: string, newTask: string) => {
        dispatch(editTodoAC(todolistId, newTask))
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
                        return (<Grid item key={el.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist key={el.id}
                                              todolistId={el.id}
                                              title={el.title}
                                              removeTodolist={removeTodolist}
                                              changeFilter={changeFilter}
                                              filter={el.filter}
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