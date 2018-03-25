const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const morgan = require('morgan');

//Express Setup
const app = express();
app.use(morgan('dev'));

//Favicon
app.use(favicon(path.join(__dirname, '..', 'public', 'static', 'assets', 'favicon.ico')));

//DB Config
const configDB = require('./config/db');

//Mongoose Middleware
mongoose.Promise = global.Promise;
mongoose.connect(configDB.URI)
    .then(() => {console.log('mLab is connected')})
    .catch(err => {console.log('error connecting to the database', err.message)});

//Bodyparser Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express-Session Middleware
const {secret} = require('./config/auth')
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30*60*1000 }
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport
require('./config/passport')(passport);

//Passport Flash Messages
app.use(flash());

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
    res.render('index', {
        title: 'Welcome',
        messages: req.flash('logout')
    });
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