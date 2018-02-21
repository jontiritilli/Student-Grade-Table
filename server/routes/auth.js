const Authentication = require('../controllers/authentication');
const passport = require('passport');

require('../services/passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = app => {
    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup);
    app.post('/get-user', requireAuth, (req, res)=>{
        const user = {
            name: req.user.givenName + ' ' + req.user.familyName,
        }
        res.send(user);
    })
    app.post('/another-route', requireAuth, (req, res) => {
        res.send('testing this secret message');
    })
}