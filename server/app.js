const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const pug = require('pug');

const app = express();

// // Passport Config
// require('./config/passport')(passport);

//DB Config
const db = require('./config/db');

//mongoose middleware
mongoose.Promise = global.Promise;

mongoose.connect(db.mongoURI)
    .then(() => {console.log('mLab is connected')})
    .catch(err => {console.log('error connecting to the database', err.message)})

//Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Session-Express Middleware
const { secret } = require('./config/passport')

app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//set view engine
app.set('views', path.join(__dirname, '..', 'public', 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '..', 'public')));

// Load Routes
const student = require('./routes/student');
const user = require('./routes/user');

//Home
app.get('/', (req, res) => {
    res.render('index');
});

// Use Routes
app.use('/student', student);
app.use('/user', user);

// //Signup
// app.get('/signup', (req, res) => {
//     res.render('signup')
// })

// //Signin
// app.get('/signin', (req, res) => {
//     res.render('signin')
// })

// //Students
// app.get('/courses', (req, res) => {
//     res.render('courses')
// })

const PORT = process.env.PORT || 9000;

//Listener
app.listen(PORT, ()=> {
    console.log('the system is running on port:', PORT);
})