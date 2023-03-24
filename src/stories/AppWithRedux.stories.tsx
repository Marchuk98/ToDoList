import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLIST/AppWithRedux Component',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
}as ComponentMeta<typeof AppWithRedux>


const Template: ComponentStory<typeof  AppWithRedux> = ()=> <AppWithRedux/>

export const AppWithReduxExample = Template.bind({})


