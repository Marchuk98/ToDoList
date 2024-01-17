import {AddItemForm} from "../../../common/components/AddItemForm/AddItemForm";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {useActions} from "../../../common/hooks/useActions";
import {todolistsThunks} from "../model/todolists/todolistsSlice";
import {useSelector} from "react-redux";
import {selectTodolists} from "../model/todolists/todolistsSelectors";
import {selectTasks} from "../model/tasks/tasksSelectors";
import {selectIsLoggedIn} from "../../auth/model/authSelectors";


export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists);
    const tasks = useSelector(selectTasks);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {
        addTodolist: addTodolistThunk,
        getTodolists,
    } = useActions(todolistsThunks);


    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        getTodolists();
    }, []);

    const addTodolistCallback = useCallback((title: string) => {
        return addTodolistThunk(title).unwrap()
    }, []);


    if (!isLoggedIn) {
        return <Navigate to={"/login"} />;
    }


    return (
        <>
            <Grid container style={{ padding: "20px" }}>
                <AddItemForm addItem={addTodolistCallback} />
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id];

                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{ padding: "10px" }}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};