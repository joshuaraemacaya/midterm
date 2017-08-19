module.exports = (req, res, next) => {
    var flag = 0
    var db = require('../db')()
    db.query(`select \`name\` from \`categories\``, (err,results,fields) => {
        if(err) res.send(err)
            for( var x = 0; x < results.length; x ++){
                if(results[x].name == req.body.category3) {
                    console.log(req.body.category3)
                    return next();
                }
            }
            console.log()
            res.redirect('/home')
    })
}