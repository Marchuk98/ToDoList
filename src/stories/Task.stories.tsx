import React from 'react';
import {action} from '@storybook/addon-actions';
import { Task } from '../components/Task';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export default {
    title: 'TODOLIST/Task Component',
    component: Task,
    args:{
        task:{id: '1', status: TaskStatuses.Completed, title: "CSS", todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        todolistId:"123",
        changeStatus:action('Change Task Status'),
        editSpan: action('Change Task Title'),
        removeTask:action('Remove Task')
}
}as ComponentMeta<typeof Task>


const Template: ComponentStory<typeof Task> = (args)=> <Task {...args}/>

export const Taskstatus: ComponentStory<typeof Task> = Template.bind({})

export const TaskNotDoneExample = Template.bind({})
TaskNotDoneExample.args ={
    task:{id: '2', status: TaskStatuses.New, title: "CSS", todoListId: "todolistId1", description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
}

