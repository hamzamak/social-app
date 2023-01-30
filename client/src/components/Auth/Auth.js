import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import useStyles from './styles'
import { LockOutlined } from '@material-ui/icons'
import { GoogleLogin } from '@react-oauth/google';
import Input from './Input';

import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

export const Auth = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const history = useHistory()
    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword((prevState) => !prevState)

    const [formData, setFormData] = useState(initialState)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signup(formData, history))
        }
        else {
            dispatch(signin(formData, history))
        }

    }

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const switchMode = () => {
        setIsSignUp(!isSignUp)
        handleShowPassword(false)
    }

    const googleSuccess = async (response) => {
        const result = jwt_decode(response?.credential)
        try {
            dispatch({ type: AUTH, data: { result, token: response?.credential } })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }



    const googleFailure = (err) => {
        console.log(err)
        console.log("erreur failure auth with google")
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3} >
                <Avatar style={{ background: 'crimson' }}>
                    <LockOutlined />
                </Avatar>

                <Typography variant='h5'>
                    {
                        isSignUp ? 'Sign Up' : 'Sign In'
                    }
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Adresse' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button fullWidth color="primary" variant='contained' type="submit" className={classes.submit} >
                        {isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                    />

                    <Grid justifyContent='flex-end' container>
                        <Grid item>
                            <Button onClick={switchMode} >
                                {isSignUp ? 'Already have An Account? Sign In' : "Don't have An Account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
}
