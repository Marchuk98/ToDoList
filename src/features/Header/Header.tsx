import {Menu} from '@mui/icons-material';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../auth/model/authSelectors";
import {selectAppStatus} from "../../app/appSelectors";
import {authThunks} from "../auth/model/authSlice";
import {useActions} from "../../common/hooks/useActions";
import s from './Header.module.css'

export const Header = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectAppStatus);
    const {logout} = useActions(authThunks);
    const logoutHandler = () => logout();



    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6">News</Typography>
                {isLoggedIn && (
                    <Button color="inherit" onClick={logoutHandler}>
                        Log out
                    </Button>
                )}
            </Toolbar>
            {status === "loading"
                ? <div className={s.linearProgress}><LinearProgress /></div>
                : <div className={s.linearProgress}></div>}
        </AppBar>
    );
};