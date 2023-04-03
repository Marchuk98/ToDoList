import React from 'react';
import {action} from '@storybook/addon-actions';
import { Task } from '../components/Task';
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: 'TODOLIST/Task Component',
    component: Task,
    args:{
        task:{id:'1',title:"JS",status:TaskStatuses:true},
        todolistId:"123",
        changeStatus:action('Change Task Status'),
        editSpan: action('Change Task Title'),
        removeTask:action('Remove Task')
}
}as ComponentMeta<typeof Task>


const Template: ComponentStory<typeof Task> = (args)=> <Task {...args}/>

export const Taskstatus:TaskStatusesExample = Template.bind({})


export const TaskNotDoneExample = Template.bind({})
TaskNotDoneExample.args ={
    task:{id:'1',title:"CSS",status:TaskStatuses:false},
}

