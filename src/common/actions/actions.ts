import {createAction} from "@reduxjs/toolkit";
import {TasksStateType} from "../../app/App";
import {TodolistDomainType} from "../../features/TodolistsList/todolists-reducer";


export const clearTasksAndTodoLists = createAction('actions/clear-tasks-todolists')