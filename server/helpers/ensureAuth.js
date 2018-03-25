module.exports = {
    ensureAuth: function  (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else if(req.url === '/logout'){
            res.redirect('/');
        } else {
            res.render('unauthorized');
        }
    }
}
