// import {setAppError, setAppStatus} from "../../app/appSlice";
// import {ResponseType} from "../../api/todolists-api";
// import {AxiosError} from "axios";
//
// export type ThunkAPIType = {
//     dispatch: (action: any) => any
//     rejectWithValue: Function
// }
//
// export const handleAsyncServerAppError = <D>(data: ResponseType<D>,
//                                              thunkAPI: ThunkAPIType,
//                                              showError = true) => {
//     if (showError) {
//         thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
//     }
//     thunkAPI.dispatch(setAppStatus({status: 'failed'}))
//     return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
// }
//
// export const handleAsyncServerNetworkError = (error: AxiosError,
//                                               thunkAPI: ThunkAPIType,
//                                               showError = true) => {
//     if (showError) {
//         thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}))
//     }
//     thunkAPI.dispatch(setAppStatus({status: 'failed'}))
//
//     return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
// }

export {}