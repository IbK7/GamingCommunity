import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { PostCard } from "../Components/PostCard";
import axios from '../api/axios'
import StyledButton from "../Components/StyledButton";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        minHeight: "100vh",
        backgroundColor: "rgb(238, 238, 238, 0.5)"
        // backgroundColor: ""
    },
    content:{
        // padding: theme.spacing(1)
    },
    profile:{
        padding: theme.spacing(2),
        boxShadow: "-5px 5px 2px 1px rgba(0, 0, 0, .2)",
        borderRadius: "5%",
        backgroundColor: "white",
        marginTop: "5%"
    },
    posts:{
        padding: theme.spacing(2),
    }
}))

const MyProfile = () => {
    const classes = useStyles();
    const navigate = useNavigate();


    const [user, setUser] = useState({
        displayName:'', 
        handle: '', 
        bio: '',
        dp: '',
    })

    const [games, setGames] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {

        axios.get('/auth', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((res) => {

             axios.get('/user', {
                params:{
                    id: res.data.user.id
                }
            }).then(userRes => {
                const currentUser = userRes.data.user;

                setUser({
                    displayName: currentUser.displayName,
                    handle: currentUser.handle,
                    bio: currentUser.bio,
                    dp: currentUser.dp,
                })

                setGames(currentUser.games)
                setPosts(currentUser.posts)
            })
        })
    }, [])

    return (
        <Grid container direction="column" alignItems="stretch" justifyContent="space-between" className={classes.wrapper} spacing={2}>
            <Grid item className={classes.header}>
                <Header dp = {user.dp} />
            </Grid>
            <Grid item className={classes.content} flex = {1}>
                <Grid container direction="row" alignItems="flex-start" justifyContent="space-around" sx={{marginLeft: '1%'}} >
                    <Grid item className={classes.profile} sm={12} xs={12} md={4} lg={4}>
                        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
                            <Grid item>
                                <Avatar 
                                    alt="@pn"
                                    sx = {{height: 125, width: 125}}
                                    src={user.dp}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" fontWeight="bold">
                                    {user.displayName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    @ {user.handle}
                                </Typography>
                            </Grid>
                            <Grid item >
                                {/* <Typography variant="h5">
                                    Bio: 
                                </Typography> */}
                                <Typography variant="body1">
                                    {user.bio}
                                </Typography>
                            </Grid>
                            <Grid item sx={{width:"100%"}} >
                                <Typography variant="h6">
                                    What I play:
                                </Typography>
                                <Grid container direction="row" alignItems="center" justifyContent="center" spacing={1} style = {{flex: "wrap"}}>
                                    {
                                        games.map((game) => 
                                            <Grid item key={game._id}>
                                                <GameCard gameName={game.gameName} gameLogoUrl={game.gameLogoUrl} />
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </Grid>
                            <Grid item>
                                <StyledButton onClick={() => {
                                    console.log(navigate('/editProfile'))
                                }}>
                                    Edit Profile
                                </StyledButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.posts} sm={12} xs={12} md={8} lg={8}>
                        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
                            {
                                (posts.length !== 0) ? (
                                    posts.map((post, index) => 
                                        <Grid item key={index}>
                                            <PostCard displayName = {user.displayName} post={post}/>
                                        </Grid>
                                    )
                                ):(
                                    <Grid item>
                                        <Grid container direction = "row" alignItems="center" justifyContent="center" spacing={1}>
                                            <Grid item>
                                                <Typography variant="h5">
                                                    No posts yet. 
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <SentimentDissatisfiedIcon fontSize="large" />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                )
                            }
                        </Grid>
                    </Grid>
                </Grid> 
            </Grid>
        </Grid>
    )
}


const GameCard = (props) => {
    return(
        <Card variant="outlined" sx={{width:"100%"}}>
            <CardContent>
                <Grid container direction="column" alignItems="center" justifyContent="center">
                    <Grid item>
                        <Avatar 
                        src={props.gameLogoUrl}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" sx={{fontWeight: "bold"}} >
                            {props.gameName}
                        </Typography>
                    </Grid>
                    
                </Grid>
            </CardContent>
        </Card>
    )
}

export default MyProfile;