module.exports = (req, res, next) => {
    var db = require('../db')()    
    db.query(`select \`author\`,\`title\` from \`posts\` where \`title\` = "${req.body.title}"` , (err, results, fields) => {
	        if(err) res.send(err)
            for( var x = 0; x < results.length; x ++){
            if(results[x].title == req.body.title){    
                if(results[x].author == req.session.userLoggedin) {
                    db.query(`delete from \`posts\` where \`title\` = "${req.body.title}"` , (err, results, fields) => {
                    return res.redirect('post')
                    })
                }
                else{
                console.log('cannot delete , not your post')
                res.redirect('new2')
                }
            }


            }
            res.redirect('new2')

    })
}