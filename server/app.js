const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const favicon = require('serve-favicon');

const app = express();

//Favicon
app.use(favicon(path.join(__dirname, '..', 'public', 'static', 'assets', 'favicon.ico')));

//DB Config
const db = require('./config/db');

//Mongoose Middleware
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI)
    .then(() => {console.log('mLab is connected')})
    .catch(err => {console.log('error connecting to the database', err.message)});

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Session-Express Middleware
app.use(session({
    secret: 'Bi32gA#wSD$34ioG2$%^34owPI*&@#$*(5Sdfbg5$^#@4ingEB@#$^34',
    resave: true,
    saveUninitialized: true
}));

// Passport
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Load Routes
const student = require('./routes/student');
const user = require('./routes/user');

// Set View Engine
app.set('views', path.join(__dirname, '..', 'public', 'views'));
app.set('view engine', 'pug');

// Set Static Folder
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// Home
app.get('/', (req, res) => {
    res.render('index');
});

// Use Routes
app.use('/student', student);
app.use('/user', user);

// Assign Port
const PORT = process.env.PORT || 9000;

//Listener
app.listen(PORT, ()=> {
    console.log('the system is running on port:', PORT);
})