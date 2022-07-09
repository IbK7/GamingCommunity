const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config()

const app = express();
app.use(cors());

const mongodbURL = process.env.MONGO_URI;

const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json({limit: '100mb'}), urlencodedParser);

const port = process.env.PORT || 8001;

mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("mongoDB connected!")
})
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Server is live!")
})

const authRoute = require('./routes/auth.route')
app.use('/auth', authRoute);

const userRoute = require('./routes/user.route')
app.use('/user', userRoute);

const gameRoute = require('./routes/game.route')
app.use('/game', gameRoute);

app.listen(port, () => console.log(`listening on localhost: ${port}`));