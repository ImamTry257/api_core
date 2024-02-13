const { DataTypes } = require('sequelize')
const db = require('../database/index')

// create model for structure table tbl_book
const Book = db.define('tbl_book', {
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false
	},
	summary: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	publisher: {
		type: DataTypes.STRING,
		allowNull: false
	}
})

module.exports = Book