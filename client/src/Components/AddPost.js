import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const AddPost = () => {
    const [post, setPost] = useState("")

    return (
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{width: '100vw', padding: '2%'}} >
            <Grid item sx = {{width: "50%"}}>
                <TextField 
                    multiline
                    minRows={3}
                    variant="outlined"
                    label="What's on your mind?"
                    sx={{width: '100%', border: 'none'}}
                    onChange = {(event) => setPost(event.target.value)}
                />
            </Grid>
        </Grid>
    )
}

export default AddPost;