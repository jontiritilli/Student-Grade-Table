module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.url === '/list' && (!req.session || !req.session.authenticated)) {
            res.render('unauthorized', { status: 403 });
            return;
        } else {
            res.redirect('/login');
        }
    }
};