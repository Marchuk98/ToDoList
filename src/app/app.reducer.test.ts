import {appErrorAC, appReducer, appStatusAC, initialStateType} from "./app-reducer";


let startState: initialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        // isInitialized: false
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, appErrorAC('some error'))

    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, appStatusAC('loading'))

    expect(endState.status).toBe('loading');
})