import React, {ChangeEvent, useState} from 'react';

type EditableSpan = {
    title: string
    callBack: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpan) => {
    const [newTitle, setNewTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }

    const onChangeEditableHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input onChange={onChangeEditableHandler} value={newTitle} onBlur={onDoubleClickHandler} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

export default EditableSpan;