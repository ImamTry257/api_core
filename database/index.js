const { Sequelize } = require('sequelize')

// import
const {
	DB,
	USER,
	PASSWORD,
	HOST,
	DIALECT
} = require('../configs/database.config')


// connect db
const database = new Sequelize(DB, USER, PASSWORD, {
	host: HOST,
	dialect: DIALECT,
	timezone: 'Asia/Jakarta', // for writing to database
})

module.exports = database