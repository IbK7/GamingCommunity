import { Grid, IconButton, TextField } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SearchIcon from '@mui/icons-material/Search';
import Dropdown from "./Dropdown";

const useStyles = makeStyles((theme) => ({
    header: {
        padding: theme.spacing(1),
        backgroundColor: "rgba(255, 140, 50, 0.85)",
    },
    seachItem:{
        width: "30%",
    },
    searchField:{
        width: "100%"
    },
    icon: {
        color:"#06113C",
    },

}))

const Header = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();


    return(
        <Grid container direction="row" alignItems="center" justifyContent="space-between" className={classes.header}>
            <Grid item className={classes.logo}>
                <IconButton onClick={()=>{navigate("/home")}}>
                    <VideogameAssetIcon fontSize="large" className={classes.icon} />
                </IconButton>
            </Grid>
            <Grid item className={classes.seachItem}>
                <TextField 
                variant="standard" 
                label="Search..." 
                className={classes.searchField} 
                InputProps={{
                    className: classes.search,
                    endAdornment: <SearchIcon sx={{color:"#06113C"}} />
                }}
                /> 
            </Grid>
            <Grid item className={classes.settings}>
                <Dropdown profilePic={props.dp} />
            </Grid>
        </Grid>
    )
}

export default Header;