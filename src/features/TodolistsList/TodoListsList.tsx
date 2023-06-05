import {AppRootState, useAppDispatch, useAppSelector} from "../../app/store";
import {useSelector} from "react-redux";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    FilterValuesType,
    getTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTasksTC, removeTasksTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import Grid from "@mui/material/Grid";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../app/App";
import {Navigate} from "react-router-dom";


type PropsType = {
    demo?:boolean
}

export const TodoListsList:React.FC<PropsType> = ({demo = false}) => {

    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootState, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)




    useEffect(() => {
        if(demo || !isLoggedIn){
            return
        }
        dispatch(getTodolistsTC());
    }, []);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTasksTC(todolistId, taskId))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTasksTC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((id: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id,filter}))
    }, [dispatch])

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistTC(newTitle))
    }, [dispatch])

    const editSpan = useCallback((todolistId: string, taskId: string, newTask: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title: newTask}))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTask: string) => {
        dispatch(changeTodolistTitleTC(todolistId, newTask))
    }, [dispatch])

    if(!isLoggedIn){
        return <Navigate to={"/login"}/>
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm callBack={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map(el => {
                return (<Grid item key={el.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist key={el.id}
                                      todolist={el}
                                      removeTodolist={removeTodolist}
                                      tasks={tasks[el.id]}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeStatus={changeStatus}
                                      filter={el.filter}
                                      editSpan={editSpan}
                                      editTodo={changeTodolistTitle}
                                      demo={demo}
                            />
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    </>
}