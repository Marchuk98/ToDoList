import {combineReducers,createStore} from "redux"
import {todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer> // typing todolists and tasks for reducers

export const store = createStore(rootReducer)


// @ts-ignore
window.store = store;