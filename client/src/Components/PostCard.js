import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    wrapper:{
        padding: theme.spacing(1),
        backgroundColor: "white"
    }
}));


export const PostCard = (props) => {
    const classes = useStyles();

    return (
        <Card variant='outlined'>
            <CardContent>
                <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start" spacing={1} className={classes.wrapper} >
                    <Grid item>
                        <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                            <Grid item>
                            <Avatar 
                            src="https://scontent-lhr8-2.xx.fbcdn.net/v/t1.18169-9/23915678_1909682169045159_9065538746294463755_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=DTEGPn4SVowAX92rR60&_nc_ht=scontent-lhr8-2.xx&oh=00_AT-aj-ny38jv-NLx2BYqZhxqQ2INquIKGx3_H_hh3SrvEw&oe=62817973"
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" sx={{fontWeight: "bold"}}>
                                {props.displayName}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant='body2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam finibus vestibulum eros vel fermentum. 
                        Nullam ac aliquet lectus, in tempus eros. 
                        Nullam hendrerit sapien orci, sit amet dignissim est eleifend sed. 
                        Donec blandit dui quis nibh semper feugiat at ornare tortor. 
                        Sed tempor aliquet sodales. Aenean mollis finibus mollis. 
                        Nam sapien velit, sodales egestas enim in, laoreet auctor elit. 
                        Nam nec dolor nec arcu feugiat maximus. Nullam tincidunt efficitur aliquet. 
                        Sed a erat placerat libero dapibus interdum. Aliquam venenatis sit amet enim et auctor. 
                        Vivamus fringilla odio vitae orci auctor faucibus. Donec vitae porta diam, a porta orci. 
                        Maecenas lorem lacus, eleifend eget ligula vitae, cursus vestibulum elit. 
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                        Donec eget mollis ex.
                    </Typography>
                </Grid>
            </Grid>
            </CardContent>
        </Card>

  )
}
