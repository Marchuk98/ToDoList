import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type SuperInputPropsType = {
    callBack: (newTitle: string) => void
}


const SuperInput = (props: SuperInputPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onClickAddTaskHandler = () => {
        let newTitle = title.trim();
        if (title !== '') {
            props.callBack(newTitle)
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
        if (e.key === 'Enter') {
            onClickAddTaskHandler();
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyPressHandler}/>
            <button onClick={onClickAddTaskHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default SuperInput;