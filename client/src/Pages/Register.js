import { Grid, TextField, Typography, IconButton, Modal, Paper, InputAdornment, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import RegisterBackground from '../assets/images/register-background.jpeg'
import StyledButton from "../Components/StyledButton";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import axios from '../api/axios'


const useStyles = makeStyles((theme) => ({
    wrapper:{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
    },
    imageContainer:{
        backgroundImage: `url(${RegisterBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        border: "1px solid black",
        boxShadow:  "4px 1px rgba(0,0,0,0.4)",
        minHeight: '50vh'
    },
    formContainer:{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: "#DDDDDD"

    },
    TextField: {
        width: "100%"
    },
    modal: {
        "&:focus": {
          borderColor: "white",
        },
    },
    paper: {
        position: "absolute",
        width: "40%",
        // height: "50%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        outline: "none",
        borderRadius: "20px",
        padding: theme.spacing(4),
        border: "2px solid #06113C"
    },
}))

const Register = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const body = (
        <Paper className={classes.paper}>
           <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
               <Grid item>
                   <Grid container direction="row" justifyContent="center" alignItems="center" spacing = {2}>
                       <Grid item>
                            <Typography variant="h5">
                                Verification Email has been sent
                            </Typography>
                       </Grid>
                       <Grid item>
                            <SendIcon fontSize="large" sx={{color:"#FF8C32"}} />
                       </Grid>
                   </Grid>
               </Grid>
               <Grid item>
                   <StyledButton variant="contained" onClick={() => {navigate('/')}}>
                       Go to Login
                   </StyledButton>
               </Grid>
           </Grid>
        </Paper>
    );

    const [user, setUser] = useState({
        displayName:'', handle: '', email:'', password:''
    })
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


    const handleRegister = async () =>{ 
        if (user.email === "" || user.password === "" || user.displayName === "" || user.handle === ""){
            setErrorText("All fields are required!")
            return
        }

        await axios.post('/auth/register', {
            displayName: user.displayName,
            handle: user.handle,
            email: user.email,
            password: user.password
        }).then((res) => {
            if (res.status !== 201){
                setErrorText(res.data.message);
            }
            else {
               handleOpen();
            }
        })
    }

    return(
       <div>
            <Grid container direction="row" alignItems="stretch" justifyContent="space-between" className={classes.wrapper}>
                <Grid item className={classes.formContainer} xs={12} sm = {12} md = {6}>
                    <Grid container direction="column" alignItems="flex-start" justifyContent="space-between" sx={{height: '100%', width: '100%'}}>
                        <Grid item>
                            <IconButton>
                                <VideogameAssetIcon fontSize="large" sx={{color:"#FF8C32"}} />
                            </IconButton>
                        </Grid>
                        <Grid item flex = {1} sx={{width:'100%'}}>
                            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{height: '100%', width: '100%'}} spacing={2}>
                                <Grid item>
                                    <Typography variant='h5'>
                                        Welcome to GamerLounge!
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        Register now and connect with gamers all across the world
                                    </Typography>
                                </Grid>
                                <Grid item sx={{width: '70%'}}>
                                    <TextField variant="filled" label="Display Name" className={classes.TextField} 
                                    onChange={(event) => setUser({...user, displayName: event.target.value})}
                                    />
                                </Grid>
                                <Grid item sx={{width: '70%'}}>
                                    <TextField variant="filled" label="Handle" className={classes.TextField}
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            @
                                          </InputAdornment>
                                        ),
                                      }}
                                    onChange={(event) => setUser({...user, handle: event.target.value})}
                                    />
                                </Grid>
                                <Grid item sx={{width: '70%'}}>
                                    <TextField variant="filled" label="Email Address" className={classes.TextField} 
                                    onChange={(event) => setUser({...user, email: event.target.value})}
                                    />
                                </Grid>
                                <Grid item sx={{width: '70%'}}>
                                    <TextField variant="filled" label="Password" type="password" className={classes.TextField} 
                                    onChange={(event) => setUser({...user, password: event.target.value})}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant = "body1" sx={{color: '#b30000'}}>
                                        {errorText}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <StyledButton onClick = {handleRegister}>
                                        Register
                                    </StyledButton>
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
                <Grid item className={classes.imageContainer} xs={12} sm = {12} md = {6}>
                    <Grid container direction="column" alignItems="center" justifyContent="center" sx={{height: '100%'}} spacing={2}>
                        <Grid item>
                            <Typography variant="h4" sx={{color: "white"}}>
                                Alredy a member at GamerLounge?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" sx={{color: "white"}}>
                                Sign in to your account
                            </Typography>
                        </Grid>
                        <Grid item>
                            <StyledButton onClick={()=>{navigate('/')}}>
                                Login
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        
            <Modal open={open} onClose={handleClose} className={classes.modal} >
                {body}
            </Modal>
       </div>
    )
}

export default Register