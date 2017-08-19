require('dotenv').config()

var express = require('express')
var app = express()
var validation1 = require('./sys/lib/middleware/validation1')
var validation2 = require('./sys/lib/middleware/validation2')
var validation3 = require('./sys/lib/middleware/validation3')
var validation4 = require('./sys/lib/middleware/validation4')
var validation5 = require('./sys/lib/middleware/validation5')
var validation6 = require('./sys/lib/middleware/validation6')
var validation7 = require('./sys/lib/middleware/validation7')
var authMiddleware = require('./sys/lib/middleware/auth')
var session = require('express-session');
var cookieParser = require('cookie-parser');
var Users ='';

require('./sys/core/boot')(app)
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.get('/login',authMiddleware.noAuthed,(req,res) => {
	res.render('login')
	})
app.post('/login',validation1,(req,res) => {

})
app.get('/home',(req,res) => {
	console.log(req.session.userLoggedin)
	var db = require('./sys/lib/db')()
	db.query('SELECT * FROM categories', (err, results, fields) => {
		return res.render('home', { categories: results });
	});

})
app.post('/home1',validation3,(req,res) => {
	var db = require('./sys/lib/db')()
	db.query(`insert into \`categories\` (\`name\`) values("${req.body.category1}")`, (err, results, fields) => {
		if(err) console.error
		res.redirect('/home')})
})
app.post('/home2',validation2,(req,res) => {

})
app.post('/home3',validation3,validation6,(req,res) => {
	var db = require('./sys/lib/db')()
	db.query(`update \`categories\` set \`name\` = "${req.body.categoryedit}" where \`name\` = "${req.body.category3}"`, (err, results, fields) => {
	if(err) console.error
	res.redirect('/home')})
	})
app.get('/signup',(req,res) => {
	res.render('signup')
})
app.post('/signup', (req, res) => {
	var db = require('./sys/lib/db')()
	db.query(`insert into \`users\` (\`username\`,\`password\`,\`email\`,\`birthdate\`,\`user_type\`) values("${req.body.username}","${req.body.password}","${req.body.email}","${req.body.bday}","${req.body.type}")`, (err, results, fields) => {
			if(err) console.error
			res.redirect('/login')})
})
app.get('/post',(req,res) => {
	var db = require('./sys/lib/db')()
	db.query(`select * from \`posts\` where \`category_name\` = "${req.session.categoryViewed}"`, (err, results, fields) => {
	return res.render('post', { posts: results});
	});
})
app.get('/new',(req,res) => {
	var db = require('./sys/lib/db')()
	db.query(`select \`email\` from \`users\` where \`email\` = "${req.session.userLoggedin}"`, (err, results, fields) => {
		return res.render('new', { users: results});
	});
})
app.post('/new',(req,res) => {
	var db = require('./sys/lib/db')()
	db.query(`insert into \`posts\` (\`author\`,\`category_name\`,\`title\`,\`content\`,\`pdate\`) values("${req.session.userLoggedin}","${req.session.categoryViewed}","${req.body.title}","${req.body.content}",CURDATE())`, (err, results, fields) => {
		return res.redirect('post')
	});
})
app.get('/new2',(req,res) =>{
	var db = require('./sys/lib/db')()
	db.query(`select \`email\` from \`users\` where \`email\` = "${req.session.userLoggedin}"`, (err, results, fields) => {
		return res.render('new2', { users: results});
	});
	})
app.post('/new2',validation4,(req,res) => {

})
app.get('/new3',(req,res) => {
	var db = require('./sys/lib/db')()
	db.query(`select \`email\` from \`users\` where \`email\` = "${req.session.userLoggedin}"`, (err, results, fields) => {
		return res.render('new3', { users: results});
	});
})
app.post('/new3',validation7,(req,res) => {
	var db = require('./sys/lib/db')()
	db.query(`update \`posts\` set \`title\` = "${req.body.title2}",\`content\` ="${req.body.content}" where \`title\` = "${req.body.title1}" ` , (err, results, fields) => {
	return res.redirect('post')
	})
})
app.get('/logout',(req,res) => {
	req.session.destroy
	console.log(req.session.userLoggedin)
	res.render('login')
})


app.listen(app.get('port'), () => {
	console.log(`Listening to port ${app.get('port')}`)
})