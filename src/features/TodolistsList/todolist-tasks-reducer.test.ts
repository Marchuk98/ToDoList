import {TasksStateType} from "../../app/App";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TodoListType} from "../../api/todolists-api";

test('ids should be equals', () => {
     const startTasksState: TasksStateType = {}
     const startTodolistsState: TodolistDomainType[] = []

    let todolist: TodoListType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }

     const action = addTodolistAC({todolist})

     const endTasksState = tasksReducer(startTasksState, action)
     const endTodolistsState = todolistsReducer(startTodolistsState, action)

     const keys = Object.keys(endTasksState)
     const idFromTasks = keys[0]
     const idFromTodolists = endTodolistsState[0].id

     expect(idFromTasks).toBe(action.payload.todolist.id)
     expect(idFromTodolists).toBe(action.payload.todolist.id)
 })