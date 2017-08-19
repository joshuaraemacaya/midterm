exports.hasAuth = (req, res, next) => {
    if (req.session && req.session.userLoggedin && Object.keys(req.session.userLoggedin).length > 0) return next();
    return res.redirect('/login');
}

exports.noAuthed = (req, res, next) => {
    if (req.session && req.session.userLoggedin && Object.keys(req.session.userLoggedin).length > 0) return res.redirect('/home');
    return next();
}