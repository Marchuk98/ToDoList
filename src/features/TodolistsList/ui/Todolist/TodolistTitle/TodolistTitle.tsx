import {useActions} from "../../../../../common/hooks/useActions";
import {TodolistDomainType, todolistsActions, todolistsThunks} from "../../../model/todolists/todolistsSlice";
import {useCallback} from "react";
import {EditableSpan} from "../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import Delete from "@mui/icons-material/Delete";


type PropsTodolistTitleType = {
    todolist: TodolistDomainType;
}

export const TodolistTitle = ({todolist}: PropsTodolistTitleType) => {
    const {id, entityStatus, title} = todolist


    const {changeTodolistTitle, removeTodolist} = useActions(todolistsThunks)
    const {changeTodolistEntityStatus} = useActions(todolistsActions)

    const removeTodolistHandler = () => {
        removeTodolist(id)
            .unwrap()
            .catch(error => {
                changeTodolistEntityStatus({id, entityStatus: "failed"})
            })
    }

    const changeTodolistTitleCallback = useCallback(
        (title: string) => {
            changeTodolistTitle({id, title});
        },
        [id],
    );


    return (
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleCallback}/>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
    );
};