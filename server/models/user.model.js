const mongoose = require("mongoose");

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

const postSchema = mongoose.Schema({
    postContent:{
        type: String,
        required: false
    },
    postAttachments: {
        type: [String],
        required: false,
    },
    postTime:{
        type: Date,
        required: true
    }
})

const userSchema = mongoose.Schema({
    displayName: String,
    handle: String,
    email: String,
    password: String,
    verified: Boolean,
    firstLogin: Boolean,
    dp: String,
    bio: {
        type: String,
        required: false,
        maxLength: 150,
    },
    games: {
        type: [gameSchema],
        required: false,
    },
    posts: {
        type: [postSchema],
        required: false
    }
}); 

const User = mongoose.model("User", userSchema);

module.exports = User;