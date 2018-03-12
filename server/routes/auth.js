const Authentication = require('../controllers/authentication');
const passport = require('passport');

require('../services/passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = app => {
    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup);

    app.get('/courses', (req, res) => {
        res.sendFile(resolve(__dirname, '..', 'client', 'home.html'))
    })
}