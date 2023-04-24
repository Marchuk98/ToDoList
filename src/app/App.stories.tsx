import React from 'react';
import App from "./App";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLIST/App Component',
    component: App,
    decorators:[ReduxStoreProviderDecorator]
}


export const AppBaseExample = (props: any) => {
    return (<App demo={true} />)
}


