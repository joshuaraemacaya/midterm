var mysql = require('mysql')

var pool

module.exports = () => {
	if(pool) return pool

	pool = mysql.createPool({
		host : process.env.DB_HOST,
		user : process.env.DB_USER,
		database : process.env.DB_NAME
	})

	return pool
}
