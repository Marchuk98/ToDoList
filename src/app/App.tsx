import React, { useEffect} from 'react';
import {TaskType} from "../features/TodolistsList/api/tasks/tasksApi.types";
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {useActions} from "../common/hooks/useActions";
import {authThunks} from "../features/auth/model/authSlice";
import {selectIsInitialized} from "./appSelectors";
import {HashRouter} from "react-router-dom";
import {ErrorSnackbar} from "../common/components/ErrorSnackBar/ErrorSnackBar";
import {Header} from "../features/Header/Header";
import {Routing} from "../features/Routing/Routing";
import './App.css';


export type TasksStateType = {
    [key: string]: TaskType[];
}

function App() {

    const isInitialized = useSelector(selectIsInitialized);
    const {initializeApp} = useActions(authThunks);

    useEffect(() => {
        initializeApp()
    }, []);


    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <HashRouter>
            <div className="App">
                <ErrorSnackbar/>
                <Header/>
                <Routing/>
            </div>
        </HashRouter>
    );
}

export default App;