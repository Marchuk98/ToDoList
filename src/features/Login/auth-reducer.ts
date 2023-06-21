import {Dispatch} from "redux";
import {authApi, FieldErrorType, LoginParamsType} from "../../api/todolists-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "../../app/app-reducer";
import {clearTasksAndTodoLists} from "../../common/actions/actions";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false
}

export const login = createAsyncThunk<void,LoginParamsType,
    {rejectValue:{errors:Array<string>, fieldsErrors?:Array<FieldErrorType>}}>(
    'auth/login', async (data,thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status:'loading'}))
        try {
            const res = await authApi.login(data)
            if(res.data.resultCode === 0){
                thunkAPI.dispatch(setAppStatus({status:"succeeded"}))
               return;
            }else {
                handleAsyncServerAppError(res.data, thunkAPI)
                return thunkAPI.rejectWithValue({errors:res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        }catch (err:any){
            const error: AxiosError = err;
           handleAsyncServerNetworkError(err,thunkAPI)
            return thunkAPI.rejectWithValue({errors:[error.message], fieldsErrors:undefined})
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout', async (_,thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status:'loading'}))
        try {
            const res = await authApi.logout()
            if(res.data.resultCode === 0){
                thunkAPI.dispatch(clearTasksAndTodoLists())
                thunkAPI.dispatch(setAppStatus({status:"succeeded"}))
                return;
            }else{
                handleAsyncServerAppError(res.data,thunkAPI)
                return thunkAPI.rejectWithValue({})
            }
        }catch (err:any){
                handleAsyncServerNetworkError(err,thunkAPI)
            return thunkAPI.rejectWithValue({})
        }
    }
)

const slice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setIsLoggedIn(state,action:PayloadAction<{isLoggedIn:boolean}>){
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers:builder => {
        builder
            .addCase(login.fulfilled,(state, action)=> {
                      state.isLoggedIn = true
            })
            .addCase(logout.fulfilled,(state, action)=> {
                state.isLoggedIn = false
            })
    }
})

export const {setIsLoggedIn} = slice.actions
export const authReducer = slice.reducer

