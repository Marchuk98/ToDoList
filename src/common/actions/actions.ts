import {createAction} from "@reduxjs/toolkit";
import {TasksStateType} from "../../app/App";
import {TodolistDomainType} from "../../features/TodolistsList/model/todolists/todolistsSlice";


export const clearTasksAndTodoLists = createAction('actions/clear-tasks-todolists')