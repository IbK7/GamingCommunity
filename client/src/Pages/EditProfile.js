import { Avatar, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Header from "../Components/Header";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from "../api/axios"
import styled from "styled-components";
import StyledButton from "../Components/StyledButton";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64"

const useStyles = makeStyles((theme) => ({
    wrapper: {
        minHeight: "100vh",
        backgroundColor: "#EEEEEE",
    },
    selected:{
        padding: theme.spacing(1),
        border: '2px solid #06113C'
    },
    notSelected:{
        padding: theme.spacing(1),
        // backgroundColor: "white"
    }
}))

var selectedGames = [];

const EditProfile = () => {
    const classes = useStyles();
    const navigate = useNavigate();


    const [user, setUser] =useState({
        id: '', dp: '', bio: '', displayName: "", handle: "",
    })

    const [games, setGames] = useState([])
    const [userGames, setUserGames] = useState([])

    let userSelectedGames = []
    useEffect(() => {

        selectedGames = [];

        axios.get('/game')
        .then((res) => {
            setGames(res.data.games)
        });

        axios.get('/auth', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then(res => {
            // setGames(res.data.user.games)
            // setUser({
            //     ...user,
            //     dp: res.data.user.dp,
            //     bio: res.data.user.bio
            // })

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

                for (var i = 0; i < currentUser.games.length; i++){
                    userSelectedGames.push(currentUser.games[i].gameName)
                }

                setUserGames(userSelectedGames)
            })
        })
    }, [user, userSelectedGames])


    const handleAdd = () => {        
        const userProfile={
            id: user.id,
            dp: user.dp,
            bio: user.bio,
            games: selectedGames,
        }

        console.log(games);
        // console.log(userGames)
        axios.post('/user/userProfile', userProfile)
        .then((res) => {
            console.log(res);
            navigate('/home')
        })
    }

    return(
        <Grid container direction="column" alignItems="stretch" justifyContent="flex-start" className={classes.wrapper} spacing={2}>
            <Grid item>
                <Header dp = {user.dp} />
            </Grid>
            <Grid item>
                <Grid container
                 direction="column" 
                 alignItems="center" 
                 justifyContent="center"
                 spacing={2}
                 >
                    <Grid item>
                        <Avatar 
                            sx = {{width: 100, height: 100, border:"1px solid black"}}
                            onClick={()=>{console.log("click")}}
                            src = {user.dp}
                        />
                    </Grid>
                    <Grid item style={{paddingLeft:"10%"}}>
                        <FileBase 
                            type="file" 
                            multiple={false} 
                            onDone={({ base64 }) => setUser({...user, dp: base64})} 
                        />
                    </Grid>
                    <Grid item>
                        <TextField 
                            variant="standard" 
                            multiline 
                            label="Handle" 
                            sx = {{width: "25vw"}}
                            // defaultValue = {user.handle}
                            defaultValue = {user.handle}
                            onChange={(event)=> setUser({...user, handle: event.target.value}) }
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    @
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField 
                            variant="standard"
                            multiline 
                            minRows={1} 
                            label="Bio" 
                            defaultValue={user.bio}
                            sx = {{width: "25vw"}}
                            onChange={(event)=> setUser({...user, bio: event.target.value}) }
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            Games:
                        </Typography>
                        <Grid container 
                        direction="row" 
                        alignItems="center" 
                        justifyContent="center" 
                        spacing={2}
                        style={{flex: "wrap"}}>
                            {
                                games.map((game) => 
                                    <Grid item key={game._id}>
                                        <GameCard 
                                        game = {game}
                                        alreadyExists = {userGames.includes(game.gameName)? true: false}
                                        />
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                    <Grid item>
                        <StyledButton onClick={handleAdd}>
                            Next
                        </StyledButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const Card = styled("div")`
        margin-top: 2vh;
        width: 12vw;
        cursor: pointer;
        background-color: white;
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        &: hover {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }
    `;

const GameCard = (props) => {
    const classes = useStyles();

 
    const [isSelected, setIsSelected] = useState(props.alreadyExists? true: false);
    // setIsSelected(props.alreadyExists);

    const toggle = () => {
        if (isSelected) {
            if (selectedGames.includes(props.game)){
                let index = selectedGames.indexOf(props.game);
                if (index > -1) {
                    selectedGames.splice(index, 1);
                }
            }
            setIsSelected(false)
        }
        else {
            selectedGames.push(props.game);
            setIsSelected(true)
        }
        // console.log(isSelected)
        // console.log(props.alreadyExists)
    }


    return(
        <Card>
            <Grid 
            container 
            direction="column" 
            alignItems="center" 
            justifyContent="center" 
            onClick={toggle}
            className = {isSelected? classes.selected: classes.notSelected}
            >
                <Grid item>
                    <Avatar 
                    src={props.game.gameLogoUrl}
                    sx={{width: 50, height: 50}}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="body2" >
                        {props.game.gameName}
                    </Typography>
                </Grid>
                
            </Grid>
        </Card>

    )
}

class TestCard extends React.Component{
    
}

export default EditProfile;