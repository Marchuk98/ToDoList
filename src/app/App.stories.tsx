import React from 'react';
import App from "./App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'TODOLIST/App Component',
    component: App,
    decorators:[ReduxStoreProviderDecorator,BrowserRouterDecorator]
}


export const AppBaseExample = (props: any) => {
    return (<App demo={true} />)
}


