import {TasksStateType} from "../../app/App";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {todolistActions} from "./todolists-reducer";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/error-utils";
import {setAppStatus} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodoLists} from "../../common/actions/actions";
import {ThunkError} from "../../utils/types";


const initialState: TasksStateType = {}


export const getTasksTC = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>(
    'tasks/fetchTasks', async (todolistId, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todolistsApi.getTasks(todolistId)
            const tasks = res.data.items
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {tasks, todolistId}
        } catch (error: any) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    }
)

export const removeTasksTC = createAsyncThunk<{ todolistId: string, taskId: string }, {
    todolistId: string,
    taskId: string
}, ThunkError>(
    'tasks/removeTasks', async (param, thunkAPI) => {
        try {
            const res = await todolistsApi.deleteTask(param.todolistId, param.taskId)
            return {todolistId: param.todolistId, taskId: param.taskId}
        } catch (e: any) {
            return e
        }
    }
)


export const addTasksTC = createAsyncThunk<TaskType, { title: string, todolistId: string }, ThunkError>('tasks/addTask',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todolistsApi.createTask(param.todolistId, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                return res.data.data.item
            } else {
                handleAsyncServerAppError(res.data, thunkAPI, false)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err:any) {
            return handleAsyncServerNetworkError(err, thunkAPI, false)
        }
    })

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        updateTaskAC(state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            model: UpdateDomainTaskModelType
        }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        changeTaskTitleAC(state, action: PayloadAction<{ taskId: string, title: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            tasks[index].title = action.payload.title
        },
        // setTaskAC(state,action:PayloadAction<{todolistId:string,tasks:TaskType[]}>){
        //     state[action.payload.todolistId] = action.payload.tasks
        // },
    },
    extraReducers: builder => {
        builder
            .addCase(todolistActions.addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistActions.removeTodolistAC, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistActions.setTodolistAC, (state, action) => {
                action.payload.todolists.forEach(el => {
                    state[el.id] = []
                })
            })
            .addCase(getTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTasksTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(el => el.id === action.payload.taskId)
                if (index > -1) {
                    state[action.payload.todolistId].splice(index, 1)
                }
            })
            .addCase(addTasksTC.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(clearTasksAndTodoLists, () => {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions

//thunk



export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        dispatch(setAppStatus({status: 'loading'}))
        const state = getState()
        const task = state.tasks[todolistId].find(el => el.id === taskId)
        if (!task) {
            console.warn("Task not found in the state")
            return;
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        todolistsApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksAction.updateTaskAC({todolistId, taskId, model: domainModel}))
                    dispatch(setAppStatus({status: 'succeeded'}))
                } else {
                    // handleServerAppError(res.data,dispatch)
                }
            })
            .catch((error) => {
                // handleServerNetworkAppError(error,dispatch)
            })
    }
}


//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
