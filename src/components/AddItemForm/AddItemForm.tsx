import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Add from "@mui/icons-material/Add";

type SuperInputPropsType = {
    callBack: (newTitle: string) => void
    disabled?:boolean
}


const AddItemForm = React.memo(({callBack,disabled=false}: SuperInputPropsType) => {
    console.log('AddItemForm is called')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onClickAddTaskHandler = () => {
        let newTitle = title.trim();
        if (title !== '') {
            callBack(newTitle)
            setTitle('');
        } else {
            setError('Title is required');
        }

    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null);
        }

        if (e.key === 'Enter') {
            onClickAddTaskHandler();
        }
    }

    return (
        <div>
            <TextField
                variant="standard"
                disabled={disabled}
                label={'Type value'}
                error={!!error}
                value={title}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyPressHandler}
                helperText={error}/>
            <IconButton onClick={onClickAddTaskHandler} disabled={disabled}>
                <Add sx={{fontSize: 40}} color={"success"}/>
            </IconButton>

        </div>
    );
});

export default AddItemForm;