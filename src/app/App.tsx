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


export type TasksStateType = {
    [key: string]: TaskType[];
}

function App() {

    console.log('App is called')

    
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
                <TodoListsList/>
            </Container>
        </div>
    );
}







export default App;