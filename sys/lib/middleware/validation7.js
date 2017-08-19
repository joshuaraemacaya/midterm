module.exports = (req, res, next) => {
    var db = require('../db')()    
    db.query(`select \`author\`,\`title\` from \`posts\` where \`title\` = "${req.body.title1}"` , (err, results, fields) => {
	        if(err) res.send(err)
            for( var x = 0; x < results.length; x ++){
            if(results[x].title == req.body.title1){    
                if(results[x].author == req.session.userLoggedin) {
                return next();
                }
                else{
                console.log('cannot delete , not your post')
                res.redirect('new2')
                }
            }
            else{
                console.log('invalid input of title')
                res.redirect('new2')
            }
            }

    })
}