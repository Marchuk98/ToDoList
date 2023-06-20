import {
    tasksAction,
    tasksReducer,
} from './tasks-reducer'
import {TasksStateType} from "../../app/App";
import {addTodolistAC, removeTodolistAC, setTodolistAC} from "./todolists-reducer";
import { TaskStatuses , TaskPriorities } from '../../api/todolists-api';


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
//
//     const action = tasksAction.removeTaskAC({todolistId:'todolistId2',taskId:'2'})
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId1"].length).toBe(3);
//     expect(endState["todolistId2"].length).toBe(2);
//     expect(endState["todolistId2"].every(t=> t.id != "2")).toBeTruthy();
// })

test('correct task should be added to correct array', () => {

    const action = tasksAction.addTaskAC({
            todoListId: "todolistId2",
            title: "juce",
            status: TaskStatuses.New,
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            priority: 0,
            startDate: "",
            id: "id exists"

    });

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe("juce")
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = tasksAction.updateTaskAC({todolistId: 'todolistId2',taskId:'2',model:{status:TaskStatuses.New}})

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {

    const action = tasksAction.changeTaskTitleAC({taskId:'2',title:'jice',todolistId:'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('jice')
    expect(endState["todolistId1"][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {

    const testAddTodoList = {
        id: "blabla",
        title: "new todolist",
        order: 0,
        addedDate: ''
    }

    const action = addTodolistAC({todolist:testAddTodoList})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC({todolistId:'todolistId2'})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('property with todolistId should be deleted', () => {

    const action = setTodolistAC({todolists:
            [
                {id: "1", title: 'What to learn', addedDate: '', order: 0},
                {id: "2", title: 'What to buy', addedDate: '', order: 0}
            ]
    })

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})


// test('task should be added for todolist', () => {
//
//    const action = tasksAction.setTaskAC({todolistId:"todolistId1",tasks:startState["todolistId1"]})
//
//     const endState = tasksReducer({
//         "todolistId2":[],
//         "todolistId1":[]
//     }, action)
//
//     expect(endState["todolistId1"].length).toBe(3)
//     expect(endState["todolistId2"].length).toBe(0)
//
// })



