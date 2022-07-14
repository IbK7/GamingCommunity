const express = require('express');
const router = express.Router();

const Post = require ("../models/post.model")

router.get("/", (req, res) => {
    Post.find({}, (err, docs) => {
        if (err) console.log(err)
        else res.status(200).json({message: "All Posts retrieved.", posts: docs})
    })
})

router.post('/addPost', (req, res) => {
    const post = req.body.post;

    Post.create(post, (err, newPost) => {
        if (err) console.log(err)
        else res.status(201).json({message: "Post Added", post: newPost})
    })
})

router.post('/deletePost', (req, res) => {
    const postId = req.body.post.id;

    Post.findByIdAndDelete(postId, (err, deletedPost) => {
        if (err) console.log(err)
        else res.status(201).json({message: "Post deleted", post: deletedPost})
    })
})

router.post('updatePost', (req, res) => {
    const post = req.body.post;

    Post.findByIdAndUpdate(post.id, post, (err, updatedPost) => {
        if (err) console.log(err)
        else res.status(201).json({message: "Post Updated", post: updatedPost});
    })
})

router.post('/userPosts', (req, res) => {
    const user = req.body.userId;

    Post.find({userId: userId}, (err, posts) => {
        if (err) console.log (err)
        else res.status(201).json({message: "Posts retrieved", posts: posts})
    })
})


module.exports = router;