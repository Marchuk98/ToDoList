import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLIST/App Component',
    component: App,
    decorators:[ReduxStoreProviderDecorator]
}as ComponentMeta<typeof App>


const Template: ComponentStory<typeof  App> = ()=> <App/>

export const AppExample = Template.bind({})


