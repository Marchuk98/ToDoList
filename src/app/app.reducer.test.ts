import {appErrorStatusAC, appReducer, appStatusAC, initialStateType} from "./app-reducer";


let startState: initialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        // isInitialized: false
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, appErrorStatusAC({error: 'some error'}))

    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, appStatusAC({status: 'loading'}))

    expect(endState.status).toBe('loading');
})