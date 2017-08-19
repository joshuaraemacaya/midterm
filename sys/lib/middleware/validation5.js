module.exports = (req, res, next) => {
    var db = require('../db')()    
    db.query(`select \`author\`,\`title\` from \`posts\` where \`title\` = "${req.body.title}"` , (err, results, fields) => {
	        if(err) res.send(err)
            for( var x = 0; x < results.length; x ++){
                if(results[x].author == req.session.userLoggedin) {
                	db.query(`update \`posts\` set \`title\` = "${req.body.title}",\`content\` = "${req.body.content}" where \`title\` = "${req.body.title2}"`, (err, results, fields) => {
                    return res.redirect('post')
                    });
                }
                else{
                console.log('cannot edit , not your post')
                res.redirect('new3')
                }
            }

    })
}