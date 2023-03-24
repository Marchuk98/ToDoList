import React from 'react';
import SuperInput from "../components/SuperInput";
import {action} from '@storybook/addon-actions';

export default {
    title: 'TODOLIST/AddItemForm Component',
    component: SuperInput,
}

const callBack = action("Button 'add' was pressed inside the form");

export const AddItemFormBaseExample = (props:any) => {
    return <SuperInput callBack={callBack}/>
}

