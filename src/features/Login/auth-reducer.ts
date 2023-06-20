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

export const login = createAsyncThunk<{isLoggedIn:boolean},LoginParamsType,
    {rejectValue:{errors:Array<string>, fieldsErrors?:Array<FieldErrorType>}}>(
    'auth/login', async (data,thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status:'loading'}))
        try {
            const res = await authApi.login(data)
            if(res.data.resultCode === 0){
                thunkAPI.dispatch(setAppStatus({status:"succeeded"}))
               return  {isLoggedIn:true};
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
                      state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const {setIsLoggedIn} = slice.actions
export const authReducer = slice.reducer

export const logout = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    authApi.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedIn({isLoggedIn:false}))
                dispatch(clearTasksAndTodoLists())
                dispatch(setAppStatus({status:"succeeded"}))
            } else {
                // handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            // handleServerAppError(error, dispatch);
        })
}