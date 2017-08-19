module.exports = (req, res, next) => {
    var flag = 0
    var db = require('../db')()
    db.query(`select \`name\` from \`categories\``, (err,results,fields) => {
        if(err) res.send(err)
            for( var x = 0; x < results.length; x ++){
                if(results[x].name == req.body.category2) {
                    console.log(req.body.category2)
                    req.session.categoryViewed = req.body.category2
                    return res.redirect('/post')
                }
            }
            res.redirect('/home')
    })
}