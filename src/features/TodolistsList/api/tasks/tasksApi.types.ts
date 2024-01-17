import {UpdateDomainTaskModelType} from "../../model/tasks/taskSlice";
import {TaskPriorities, TaskStatuses} from "../../../../common/enum/common.enums";


export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};

export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};

export type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskType[];
};

export type AddTaskArgType = {
    title: string;
    todolistId: string;
};

export type UpdateTaskArgType = {
    taskId: string;
    domainModel: UpdateDomainTaskModelType;
    todolistId: string;
};

export type RemoveTaskArgType = {
    todolistId: string;
    taskId: string;
};