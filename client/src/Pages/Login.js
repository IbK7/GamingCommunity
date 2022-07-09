import { Grid, TextField, Typography, Link, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import LoginBackground from '../assets/images/login-background.jpeg'
import StyledButton from "../Components/StyledButton";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from "react-router-dom";
import axios from '../api/axios'

const useStyles = makeStyles((theme) => ({
    wrapper:{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
    },
    imageContainer:{
        backgroundImage: `url(${LoginBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        border: "1px solid black",
        boxShadow:  "4px 1px rgba(0,0,0,0.4)"
    },
    formContainer:{
        width: '100%',
        backgroundColor: "#DDDDDD"

    },
    TextField: {
        width: "100%"
    }
}))

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [errorText, setErrorText] = useState("")

    useEffect(() => {
        axios.get('/auth', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then(res => {
            if (res.data.isLoggedIn) navigate('/home')
        })
    }, [navigate])

    const handleLogin = async () => {
        if (email === "" || password === ""){
            setErrorText("Email or Password cannot be empty!")
            return
        }

        await axios.post("/auth/login", {
            email: email,
            password: password,
        }).then((res) => {
            if (res.status !== 201) setErrorText(res.data.message);
            else {
                localStorage.setItem("token", res.data.token);
                navigate('/home');
            }
        })

    }

    return(
       <Grid container direction="row" alignItems="stretch" justifyContent="space-between" className={classes.wrapper}>
            <Grid item className={classes.imageContainer} xs={12} sm = {12} md = {6}>
                <Grid container direction="column" alignItems="center" justifyContent="center" sx={{height: '100%'}} spacing={2}>
                    <Grid item>
                        <Typography variant="h4" sx={{color: "white", fontWeight: "bold"}}>
                            Welcome to GamerLounge!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" sx={{color: "white"}}>
                            Haven't got an account yet?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <StyledButton variant='contained' onClick={()=>{navigate('/register')}} >
                            Register
                        </StyledButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.formContainer} xs={12} sm = {12} md = {6}>
                <Grid container direction="column" alignItems="flex-end" justifyContent="space-between" sx={{height: '100%', width: '100%'}}>
                    <Grid item>
                        <IconButton>
                            <VideogameAssetIcon fontSize="large" sx={{color:"#FF8C32"}} />
                        </IconButton>
                    </Grid>
                    <Grid item flex = {1} sx={{width:'100%'}}>
                        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{height: '100%', width: '100%'}} spacing={2}>
                            <Grid item>
                                <Typography variant='h5'>
                                    Welcome back Gamer! Sign in to your account
                                </Typography>
                            </Grid>
                            <Grid item sx={{width: '70%'}}>
                                <TextField variant="filled" label="Email Address" className={classes.TextField} 
                                onChange={(event) => setEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid item sx={{width: '70%'}}>
                                <TextField variant="filled" label="Password" type="password" className={classes.TextField} 
                                onChange={(event) => setPassword(event.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant = "body2" sx={{color: '#b30000'}}>
                                    {errorText}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <StyledButton onClick={handleLogin}>
                                    Login
                                </StyledButton>
                            </Grid>
                            <Grid item>
                                <Typography variant = "body2" sx = {{cursor: "pointer"}}>
                                    <Link>
                                        Forgot your password?
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row" alignItems="center" justifyContent="center">
                                    <Grid item>
                                        <IconButton>
                                            <GoogleIcon fontSize="large" sx={{color:'red'}} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton>
                                            <FacebookIcon fontSize="large" sx={{color: '#0000b3'}} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
       </Grid>
    )
}

export default Login