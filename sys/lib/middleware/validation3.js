module.exports = (req, res, next) => {
    var flag = 0
    var db = require('../db')()
    db.query(`select \`user_type\` from \`users\` where \`username\` = "${req.session.userLoggedin}"`, (err,results,fields) => {
        if(err) res.send(err)
            for( var x = 0; x < results.length; x ++){
                if(results[x].user_type != 'admin') {
                    console.log('cannot add category, not an admin')
                    res.redirect('home') 
                    return
                }
            }
        return next();
    })
}