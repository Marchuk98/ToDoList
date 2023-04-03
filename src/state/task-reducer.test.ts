import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer'
import {TasksStateType} from "../AppWithRedux";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";
import { TaskStatuses , TaskPriorities } from '../api/todolists-api';


let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
        ]
    };
});



// test('correct task should be deleted from correct array', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status:TaskStatuses: false},
//             {id: '2', title: 'JS', status:TaskStatuses: true},
//             {id: '3', title: 'React', status:TaskStatuses: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status:TaskStatuses: false},
//             {id: '2', title: 'milk', status:TaskStatuses: true},
//             {id: '3', title: 'tea', status:TaskStatuses: false}
//         ]
//     }
//
//     const action = removeTaskAC('todolistId2','2')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId1"].length).toBe(3);
//     expect(endState["todolistId2"].length).toBe(2);
//     expect(endState["todolistId2"].every(t=> t.id != "2")).toBeTruthy();
// })
//
// test('correct task should be added to correct array', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status:TaskStatuses: false},
//             {id: '2', title: 'JS', status:TaskStatuses: true},
//             {id: '3', title: 'React', status:TaskStatuses: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status:TaskStatuses: false},
//             {id: '2', title: 'milk', status:TaskStatuses: true},
//             {id: '3', title: 'tea', status:TaskStatuses: false}
//         ]
//     }
//
//     const action = addTaskAC( 'todolistId2','juce')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'].length).toBe(4)
//     expect(endState['todolistId2'][0].id).toBeDefined()
//     expect(endState['todolistId2'][0].title).toBe("juce")
//     expect(endState['todolistId2'][0].status:TaskStatuses).toBe(false)
// })
//
// test('status of specified task should be changed', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status:TaskStatuses: false},
//             {id: '2', title: 'JS', status:TaskStatuses: true},
//             {id: '3', title: 'React', status:TaskStatuses: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status:TaskStatuses: false},
//             {id: '2', title: 'milk', status:TaskStatuses: true},
//             {id: '3', title: 'tea', status:TaskStatuses: false}
//         ]
//     }
//
//     const action = changeTaskStatusAC('todolistId2','2',false)
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][1].status:TaskStatuses).toBeFalsy()
//     expect(endState["todolistId1"][1].status:TaskStatuses).toBeTruthy()
// })
//
// test('title of specified task should be changed', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status:TaskStatuses: false},
//             {id: '2', title: 'JS', status:TaskStatuses: true},
//             {id: '3', title: 'React', status:TaskStatuses: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status:TaskStatuses: false},
//             {id: '2', title: 'milk', status:TaskStatuses: true},
//             {id: '3', title: 'tea', status:TaskStatuses: false}
//         ]
//     }
//
//     const action = changeTaskTitleAC('2', 'jice', 'todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][1].title).toBe('jice')
//     expect(endState["todolistId1"][1].title).toBe('JS')
// })
//
// test('new array should be added when new todolist is added', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status:TaskStatuses: false},
//             {id: '2', title: 'JS', status:TaskStatuses: true},
//             {id: '3', title: 'React', status:TaskStatuses: false}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status:TaskStatuses: false},
//             {id: '2', title: 'milk', status:TaskStatuses: true},
//             {id: '3', title: 'tea', status:TaskStatuses: false}
//         ]
//     }
//
//     const action = addTodolistAC('new todolist')
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })
//
// test('property with todolistId should be deleted', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status:TaskStatuses},
//             {id: '2', title: 'JS', status:TaskStatuses},
//             {id: '3', title: 'React', status:TaskStatuses}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status:TaskStatuses},
//             {id: '2', title: 'milk', status:TaskStatuses},
//             {id: '3', title: 'tea', status:TaskStatuses}
//         ]
//     }
//
//     const action = removeTodolistAC('todolistId2')
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(1)
//     expect(endState['todolistId2']).not.toBeDefined()
// })


