import {Container} from "@mui/material";
import {Route, Routes} from 'react-router-dom';
import {TodolistsList} from "../TodolistsList/ui/TodoListsList";
import {Login} from "../auth/ui/Login";


export const Routing = () => {

    return (
        <Container fixed>
            <Routes>
                <Route path={"/"} element={<TodolistsList />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </Container>
    );
};