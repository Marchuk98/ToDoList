import {RequestStatusType} from "../../../../app/appSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodoLists} from "../../../../common/actions/actions";
import {todolistsApi, TodolistType, UpdateTodolistTitleArgType} from "../../api/todolists/todolistsApi";
import {createAppAsyncThunk} from "../../../../common/utils/create-app-async-thunk";
import {ResultCode} from "../../../../common/enum/common.enums";


export const getTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
    'todo/fetchTodolists',
    async (_) => {
        const res = await todolistsApi.getTodolists();
        return {todolists: res.data};
    },
);

export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
    'todo/addTodolist',
    async (title, thunkAPI) => {
        const {rejectWithValue} = thunkAPI;
        const res = await todolistsApi.createTodolist(title);
        if (res.data.resultCode === ResultCode.Success) {
            return {todolist: res.data.data.item};
        } else {
            return rejectWithValue(res.data);
        }
    },
);

export const removeTodolist = createAppAsyncThunk<{ id: string }, string>('todo/removeTodolist', async (id, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: 'loading'}));
    const res = await todolistsApi.deleteTodolist(id);
    if (res.data.resultCode === ResultCode.Success) {
        return {id};
    } else {
        return rejectWithValue(res.data);
    }
});

export const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
    'todo/changeTodolistTitle',
    async (arg, thunkAPI) => {
        const {rejectWithValue} = thunkAPI;
        const res = await todolistsApi.updateTodolist(arg);
        if (res.data.resultCode === ResultCode.Success) {
            return arg;
        } else {
            return rejectWithValue(res.data);
        }
    },
);

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
    name:"todolist",
    initialState,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.filter = action.payload.filter;
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}));
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                const newTodolist: TodolistDomainType = {
                    ...action.payload.todolist,
                    filter: 'all',
                    entityStatus: 'idle',
                };
                state.unshift(newTodolist);
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) state.splice(index, 1);
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const todo = state.find((todo) => todo.id === action.payload.id);
                if (todo) {
                    todo.title = action.payload.title;
                }
            })
            .addCase(clearTasksAndTodoLists, () => {
                return [];
            })
    },
});


export const todolistsSlice = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {getTodolists, addTodolist, removeTodolist, changeTodolistTitle};

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};