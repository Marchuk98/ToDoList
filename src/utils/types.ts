import {FieldErrorType} from "../api/todolists-api";

export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }