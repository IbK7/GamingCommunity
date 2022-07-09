import React, { useState, useEffect } from "react";
// import StyledButton from "../Components/StyledButton";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios'
import { Grid } from "@mui/material";
import Header from "../Components/Header";
import { makeStyles } from "@mui/styles";
import AddPost from "../Components/AddPost";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#EEEEEE",
        minHeight: "100vh"
    }
}))

const Home = () => {
    const classes = useStyles()
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: '',
        dp: ''
    })
    useEffect(()=>{
        function navigateLogin(){
            navigate('/')
        }

        axios.get('/auth', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then(res => {
            if(res.data.isLoggedIn === false) navigateLogin();
            else{
                setUser({...user, id: res.data.user.id})
                axios.get('/user', {
                    params:{
                        id: res.data.user.id
                    }
                }).then((res1) => {
                    if(res1.data.user.firstLogin) navigate('/editprofile')
                    else{
                        setUser({...user, dp: res1.data.user.dp})
                        console.log(user.dp)
                    }
                })
            }
        })

        
    }, [])

    return(
        <Grid container direction="column" alignItems="stretch" justifyContent="space-between" className={classes.container}>
            <Grid item>
                <Header dp = {user.dp} />
            </Grid>
            <Grid item className={classes.wall} flex={1}>
                <Grid container direction="row" alignItems="center" justifyContent="center" spacing={1}>
                    <Grid item>
                        <AddPost />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home