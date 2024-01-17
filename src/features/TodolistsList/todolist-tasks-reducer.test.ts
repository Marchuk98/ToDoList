import {TasksStateType} from "../../app/App";
import {TodolistDomainType, todolistsSlice, todolistsThunks} from "./model/todolists/todolistsSlice";
import {TodolistType} from "./api/todolists/todolistsApi";
import {taskSlice} from "./model/tasks/taskSlice";

test("ids should be equals", () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist: TodolistType = {
        title: "new todolist",
        id: "any id",
        addedDate: "",
        order: 0,
    };

    const action = todolistsThunks.addTodolist.fulfilled({ todolist: todolist }, "requestId", todolist.title);

    const endTasksState = taskSlice(startTasksState, action);
    const endTodolistsState = todolistsSlice(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});