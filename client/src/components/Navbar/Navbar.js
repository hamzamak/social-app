import { AppBar,  Avatar,  Button,  Toolbar,  Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png'
import useStyles from './styles'
import {Link, useHistory,useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode'
function Navbar() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const history = useHistory()
    const location =useLocation()
    const [user,setUser] = useState( JSON.parse(localStorage.getItem('profile')) ) 

    useEffect(()=> {
        let token = user?.token
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime() ){
                logOut()

            }
        }     
        setUser( JSON.parse(localStorage.getItem('profile')) ) 
    }, [location])

    const logOut =()=>{
       dispatch({type : LOGOUT})
       history.push('/')
       setUser(null)
    }
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer} >
        <Link to="/">
        <img className={classes.image} src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
        </Link>

        </div>
        <Toolbar>
            {
                user ? (
                    <div className={classes.profile}>
                        <Avatar src={user.result?.picture} alt ={user.result?.name} className={classes.purple} >{user.result?.name.charAt(0)} </Avatar>
                       <Typography className={classes.userName} variant='h6'>{user.result?.name} </Typography> 
                       <Button variant='contained' className={classes.logout} color ='secondary' onClick={logOut} >Logout</Button>
                    </div>
                )  :(
                    <Button variant='contained' component={Link} to="/auth" color ='primary' >SignIn</Button>
                )
            }
        </Toolbar>
      </AppBar>
  )
}

export default Navbar