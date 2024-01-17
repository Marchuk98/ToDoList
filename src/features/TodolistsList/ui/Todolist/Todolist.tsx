import {useActions} from "../../../../common/hooks/useActions";
import {memo, useCallback, useEffect} from "react";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {FilterTasksButton} from "./FilterTasksButtons/FilterTasksButton";
import {TodolistDomainType} from "../../model/todolists/todolistsSlice";
import { TaskType } from "../../api/tasks/tasksApi.types";
import {tasksThunk} from "../../model/tasks/taskSlice";
import {Tasks} from "./Tasks/Task";
import {AddItemForm} from "../../../../common/components/AddItemForm/AddItemForm";


type PropsTodolistType = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist = memo(function ({todolist, tasks}: PropsTodolistType) {
    const {getTasks, addTask} = useActions(tasksThunk);


    useEffect(() => {
        getTasks(todolist.id);
    }, []);

    const addTaskCallback = useCallback(
        (title: string) => {
            return addTask({title, todolistId: todolist.id}).unwrap()
        },
        [todolist.id],
    );


    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
            <Tasks tasks={tasks} todolist={todolist}/>
            <div style={{paddingTop: '10px'}}>
                <FilterTasksButton todolist={todolist}/>
            </div>
        </div>
    );
});
