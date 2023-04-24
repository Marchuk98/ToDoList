import React from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {TaskType} from "../api/todolists-api";
import {TodoListsList} from "../features/TodolistsList/TodoListsList";
import {LinearProgress} from "@mui/material";
import {CustomizedSnackbars} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useAppSelector} from "./store";
import {EntityStatusType} from "../features/TodolistsList/todolists-reducer";


export type TasksStateType = {
    [key: string]: TaskType[];
}

type PropsType = {
    demo?:boolean
}

function App ({demo=false}:PropsType) {

    console.log('App is called')

    const status = useAppSelector<EntityStatusType>(state => state.app.status)

    return (
        <div className="App">
            <CustomizedSnackbars/>
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
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <TodoListsList demo={demo}/>
            </Container>
        </div>
    );
}







export default App;