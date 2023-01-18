const dotenv = require('dotenv');
const mongoose =  require('mongoose');
const express = require('express');
const app = express();
dotenv.config();
require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'))
//const User = require('./models/userSchema');
const PORT = process.env.PORT;

app.get('/', (req, res) =>{
    res.send('hello world from the saba')

});
app.get('/about', (req, res) =>{
    res.send('hello world from the about')

});
app.get('/contact', (req, res) =>{
    res.send('hello world from the contact')

});
app.get('/signin', (req, res) =>{
    res.send('hello world from the signin')

});
app.get('/signup', (req, res) =>{
    res.send('hello world from the signup')

});



app.listen(PORT, () =>{
    console.log(`server is running on port no ${PORT}`)
})