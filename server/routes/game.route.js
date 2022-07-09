const express = require('express')
const router = express.Router();

const Game = require('../models/game.model');


router.get('/', (req, res) => {
    Game.find({}, (err, docs) => {
        if (err) console.log(err)
        else res.status(200).json({message: "All games retrieved.", games: docs})
    })
})

router.post('/addGame', (req, res) => {
    const newGame = req.body;

    Game.findOne({gameName: newGame.gameName}, (err, game) => {
        if(game) res.json({message: "Game already exists"});
        else{
            Game.create(newGame, (err, game) => {
                if(err) console.log(err)
                else res.status(201).json({message: "Game added", game: game})
            })
        }
    });
})


module.exports = router;