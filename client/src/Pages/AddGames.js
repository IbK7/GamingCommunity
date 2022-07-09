import { Button, TextField } from '@mui/material'
import React from 'react'
import axios from '../api/axios'

const AddGames = () => {
    const [name, setName] = React.useState("");
    const [url, setUrl] = React.useState("");

    const handleAdd = () => {
        axios.post('/game/addGame', {
            gameName: name, 
            gameLogoUrl: url
        }).then((res) => {
            console.log(res.data)
        })
    }
    return (
        <div>
            <TextField 
            label="Game Name"
            onChange={(event) => {setName(event.target.value)}}
            />
            <TextField 
            label="Logo URL"
            onChange={(event) => {setUrl(event.target.value)}}
            />
            <Button onClick={handleAdd}>
                Add Game
            </Button>
        </div>
    )
}

export default AddGames