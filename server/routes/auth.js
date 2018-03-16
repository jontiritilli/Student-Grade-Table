const Authentication = require('../controllers/authentication');
const passport = require('passport');

require('../services/passport');
const requireAuth = passport.authenticate('jwt', {
    successRedirect: '/home',
    successFailure: '/login',
    session: false});

const requireSignin = passport.authenticate('local', {
    session: false,
    redirectSuccess: '/',
    redirectFailure: '/signup'
});



module.exports = app => {
    app.post('/auth/signin', requireSignin, Authentication.signin)
    app.post('/auth/signup', Authentication.signup);

    app.get('/courses', (req, res) => {
        res.sendFile(resolve(__dirname, '..', 'client', 'home.html'))
    })
}