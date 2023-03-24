import React from 'react';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import EditableSpan from "../components/EditableSpan";

export default {
    title: 'TODOLIST/EditableSpan Component',
    component: EditableSpan,
    args:{
        callBack:action('Editable span changed')
    }
}as ComponentMeta<typeof EditableSpan>


const Template: ComponentStory<typeof EditableSpan> = (args)=> <EditableSpan {...args} title={'Start Value'}/>
export const EditTaskTitleExample = Template.bind({})

