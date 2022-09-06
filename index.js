if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const port = 3000;
const mongoose = require('mongoose');
const Listing = require('./models/listModel');
const User = require('./models/userModel');
const bcrypt = require('bcrypt');
const { brotliCompressSync } = require('zlib');
//const passport = require('passport');
//const initPassport = require('./passport-config');
//const session = require('express-session');
//const flash = require('express-flash');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(flash());
//app.use(session({
//    secret: process.env.SESSION_SECRET,
//    resave: false,
//    saveUnitialized: false
//}))
//app.use(passport.initialize());
//app.use(passport.session());


mongoose.connect('mongodb://localhost:27017/waterbnb')
    .then(() => {
        console.log('connected');
    })
    .catch((err) => {
        console.log('connection error');
        console.log(err);
    })



//list all places
app.get('/', async (req, res) => {
    const lists = await Listing.find({});
    res.render('home', {lists});
})

//check places individually
app.get('/room/:id', async(req, res) => {
    const {id} = req.params;
    const room = await Listing.findById(id);
    res.render('place', {room});

})

//add new listing
app.get('/add', (req, res) => {
    res.render('add');
})

app.post('/add', async(req,res) => {
    const newList = new Listing(req.body);
    await newList.save();
    res.redirect(`/room/${newList._id}`);
})

//create new user
app.get('/signup', (req, res) => {
    res.render('register');
})

app.post('/signup', async(req,res) => {
    try{
        const newUserUser = req.body.username;
        console.log(req.body.password);
        const newUserPass = await bcrypt.hash(req.body.password, 10);
        const newUser = new User.User({username: newUserUser, password: newUserPass});
        console.log(newUserPass);
        await newUser.save();
        res.redirect('/login');
    }catch(e) {
        console.log(e);
    }
})

//login page
app.get('/login', (req, res) => {
    res.render('login');
})


//user authentication
app.post('/login', async (req, res) => {
    const lists = await Listing.find({});
    const {username, password} = req.body;
    const user = await User.User.findOne({username});
    try {
        if(!user){
            res.send('user not found');
        }else {
            bcrypt.compare(password, user.password, function(result){
                res.render('home_logged_in', {lists});
            })
        }
    }catch (e) {
        console.log(e);
    }
})
//user authentication with passport (nakakaliito mga tutorial coach)
//app.post('/login', passport.authenticate('local', {
//    successRedirect: '/',
//    failureRedirect: '/login',
//    failureFlash: true
//}), (req, res) => {
//    const user = User.User.find(req.body.username);
//    initPassport(passport, user.username, user._id);
//
//})


//update listing
app.get('/room/:id/update', async(req, res) => {
    const {id} = req.params;
    const toEdit = await Listing.findById(id);
    res.render('edit', {toEdit});
})

app.put('/room/:id', async(req, res) => {
    const {id} = req.params;
    const room = await Listing.findByIdAndUpdate(id, req.body, {runValidators: true});
    res.redirect(`/room/${room._id}`);
})

//delete listing
app.delete('/room/:id', async(req, res) => {
    const {id} = req.params;
    const toDelete = await Listing.findByIdAndDelete(id);
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})