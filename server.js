const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const db = require('./db');
const PORT = 4000;

// creating ref to express
const app = express();

// settings of view engine
app.set('view engine', 'ejs');
app.set('views', './view');

// output response and form encoding format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(cors());
app.use(cookieParser());

// mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(db.hostUrl, {useNewUrlParser: true },(err) => {
    if(err) throw err;
    console.log(`mongodb connected`);
})

// default route
app.use('/', require('./route/userRouter'));

// server connection
app.listen(PORT, () => {
    console.log(`server is running @ http://localhost:${PORT}`)
});