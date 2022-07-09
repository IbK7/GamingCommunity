const express = require('express');
const router = express.Router();
var multer = require('multer')

const User = require('../models/user.model')

var fs = require('fs');
var path = require('path');

router.get('/', (req,res) => {
    const id = req.query.id;
 
    User.findById(req.query.id, (err, user) => {
        if (err) console.log(err)
        else{
            res.status(200).json({
                message: "User fetched",
                user: user
            })
        }
    })
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

router.post('/userProfile', upload.single('image'), (req, res, next) => {
    const user = req.body

    const updatedUser = {
        firstLogin: false,
        dp: user.dp,
        bio: user.bio,
        games: user.games,
    }
    
    User.findByIdAndUpdate(user.id, updatedUser, (err, doc) => {
        if (err) console.log(err)
        else res.status(201).json({message: "Details Updated", user: doc})
    })
})

module.exports = router;