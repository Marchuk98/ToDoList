import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import {AppRootState} from './store'
import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolist-reducer'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status:TaskStatuses: true},
            {id: v1(), title: 'JS', status:TaskStatuses: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status:TaskStatuses: true},
            {id: v1(), title: 'React Book', status:TaskStatuses: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)