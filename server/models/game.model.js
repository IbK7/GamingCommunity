const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    gameName: {
        type: String,
        required: true
    },
    gameLogoUrl:{
        type: String,
        required: true,
    }
})

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;