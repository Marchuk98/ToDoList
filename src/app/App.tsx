import React, {useCallback, useEffect} from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import {TaskType} from "../api/todolists-api";
import {TodoListsList} from "../features/TodolistsList/TodoListsList";
import {CircularProgress, LinearProgress} from "@mui/material";
import {CustomizedSnackbars} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useAppDispatch, useAppSelector} from "./store";
import {EntityStatusType} from "../features/TodolistsList/todolists-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {initializeApp} from "./app-reducer";
import {logout} from "../features/Login/auth-reducer";


export type TasksStateType = {
    [key: string]: TaskType[];
}

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    console.log('App is called')

    const dispatch = useAppDispatch()

    const status = useAppSelector<EntityStatusType>(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    },[])

    if (!isInitialized) {
        return <div style={{position: "fixed", top: "40%", textAlign: "center", width: "100%"}}>
            <CircularProgress color="primary"/>
        </div>
    }
    return (
        <BrowserRouter>
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
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Routes>
                    <Route path='/' element={<TodoListsList demo={demo}/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}


export default App;