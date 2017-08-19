module.exports = (req, res, next) => {
    var flag = 0
    var db = require('../db')()
    db.query(`select username,email,password,user_type from users`, (err,results,fields) => {
        if(err) res.send(err)
            for(x = 0; x < results.length; x ++){
                if(results[x].email == req.body.email && results[x].password == req.body.password) {
                    req.session.userLoggedin = results[x].username
                    console.log(req.session.userLoggedin)
                    req.session.usertypeLoggedin = results[x].user_type
                    console.log(req.session.usertypeLoggedin)
                    res.redirect('/home')
                    return
                }
            }
            res.render('login')

    })
}

