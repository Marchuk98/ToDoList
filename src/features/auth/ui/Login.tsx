import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../../app/store";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../model/authSelectors";
import {useLogin} from "../lib/useLogin";
import s from './login.module.css';


export const Login = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isCaptchaUrl = useSelector<AppRootStateType, string | null>(state => state.auth.captchaUrl);
    const formik = useLogin()

    if(isLoggedIn){
        return <Navigate to={'/'}/>
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered{" "}
                                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p> Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
                            {formik.touched.email && formik.errors.email && <p className={s.error}>{formik.errors.email}</p>}
                            <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
                            {formik.touched.password && formik.errors.password && <p className={s.error}>{formik.errors.password}</p>}
                            <FormControlLabel
                                label={"Remember me"}
                                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
                            />
                            {isCaptchaUrl && <img src={isCaptchaUrl}/>}
                            {isCaptchaUrl && <TextField type="Captcha" label="captcha" margin="normal" {...formik.getFieldProps("captcha")} />}
                            {formik.touched.captcha && formik.errors.captcha && <p className={s.error}>{formik.errors.captcha}</p>}

                            <Button
                                type={"submit"}
                                variant={"contained"}
                                disabled={!(formik.isValid && formik.dirty)}
                                color={"primary"}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}