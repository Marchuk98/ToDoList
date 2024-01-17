import {TodolistDomainType} from "../../../model/todolists/todolistsSlice";
import {TaskType} from "../../../api/tasks/tasksApi.types";
import {TaskStatuses} from "../../../../../common/enum/common.enums";
import {Task} from "./Task/Task";

type PropsTasksType = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
}

export const Tasks = ({todolist, tasks}: PropsTasksType) => {


    let tasksForTodolist = tasks;

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }


    return (
        <>
            {tasksForTodolist.map((t) => (
                <Task
                    key={t.id}
                    task={t}
                    todolistId={todolist.id}
                />
            ))}
        </>
    );
};