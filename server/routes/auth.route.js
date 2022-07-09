const express = require('express');
const router = express.Router();
const crypto = require("crypto");

const User = require('../models/user.model');
const Token = require('../models/token.model')

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const sendEmail = require('../utils/email')


router.post('/register', async (req, res) => {
    const user = req.body;
    user.password = await bcrypt.hash(req.body.password, 10);

    User.findOne({email: user.email}, function(err, newUser){
        if (err) console.log(err)
        else{
            if (newUser != null) res.json({message: "Email already registered. Please login"})
            else{
                User.findOne({handle: user.handle}, async (err, userToRegister) => {
                    if (err) console.log(err)
                    else{
                        if(userToRegister != null) res.json({message: "Handle already in use. Please try again."})
                        else{
                            const userToAdd = new User({
                                displayName: user.displayName,
                                handle: user.handle,
                                email: user.email.toLowerCase(),
                                password: user.password,
                                verified: false,
                                firstLogin: true,
                            });
                            
                            

                            User.create(userToAdd, async (err, registeredUser) => {
                                if (err) console.log(err)
                                else {
                                    var today = new Date();

                                    let verifyToken = await new Token({
                                        userId: registeredUser._id,
                                        verifyToken: crypto.randomBytes(32).toString("hex"),
                                        createDate: today,
                                    }).save();

                                    const message = `${process.env.BASE_URL}/auth/verify/${verifyToken.userId}/${verifyToken.verifyToken}`;
                                    await sendEmail(user.email, "GamerLounge: Verify Email", message);
                                    res.status(201).json({message: "Email sent!"})
                                }
                            });
                        }
                    }
                })
            }
        }
    });
})

router.get("/verify/:id/:token", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send("Invalid link");
    
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");
  
        User.findByIdAndUpdate(user._id,  {verified: true }, (err, doc) => {
            if (err) console.log(err)
            else res.status(200).send(`${doc.email} account has been verified`);
        })
        await Token.findByIdAndRemove(token._id);
        } catch (error) {
            console.log(error)
            res.status(400).send("An error occured");
        }
  });

router.post('/login', (req, res) => {
    const user = req.body;

    User.findOne({email: user.email}, function(err, incomingUser){
        if (err) console.log(err);
        else{
            if (incomingUser == null) res.json({message: "Email or Password is incorrect"})
            else if(incomingUser.verified === false) res.json({message: "Email has not been verified."});
            else{
                bcrypt.compare(user.password, incomingUser.password, function(err, isValid){
                    if(err) console.log(err)
                    else{
                        if (!isValid) res.json({message:"Email or Password is incorrect"})
                        else{

                            const payload = {
                                id: incomingUser._id,
                                email: incomingUser.email,
                                displayName: incomingUser.displayName,
                                handle: incomingUser.handle
                            }

                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                {expiresIn: 86400},
                                (err, token) => {
                                    if (err) console.log(err)
                                    else res.status(201).json({message: "Logged In", token: token})
                                }
                            )
                        }
                    }
                })
            }
        }
    })
})

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    
    if (token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)  res.json({isLoggedIn: false, message: "Authentication failed"})
            else{
                req.user = {}
                req.user.id = decoded.id
                req.user.email = decoded.email
                req.user.firstName = decoded.firstName
                req.user.lastName = decoded.lastName
                next();
            }
        })
    }else{
        res.json({isLoggedIn: false, message: "Token invalid"})
    }
}

router.get('/', verifyJWT, (req, res) => {
    res.json({isLoggedIn: true, user: req.user});
})

module.exports = router;

// router.route('/add').post(upload.single('photo'), (req, res) => {
//     const name = req.body.name;
//     const birthdate = req.body.birthdate;
//     const photo = req.file.filename;

//     const newUserData = {
//         name,
//         birthdate,
//         photo
//     }

//     const newUser = new User(newUserData);

//     newUser.save()
//            .then(() => res.json('User Added'))
//            .catch(err => res.status(400).json('Error: ' + err));
// });