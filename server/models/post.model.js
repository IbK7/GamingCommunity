const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId: String,
    postContent:{
        type: String,
        required: false
    },
    postTime:{
        type: Date,
        required: true
    }
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post;