// init model
const Book = require('../models/book')

// store method
exports.create = async ( req, res ) => {

	try {
		// init param body
		const { title, author, summary, publisher } = req.body

		// store data book
		const bookCreate = await Book.create({
			title,
			author,
			summary,
			publisher
		})

		return res.status(201).json({
			status: 201,
			success: true,
			message: 'Data Buku berhasil dibuat',
			data : { bookCreate }
		})
	} catch ( err ) {
		console.log(err)

		return res.status(500).json({
			status: 500,
			success: false,
			message: 'Internal Server Error'
		})
	}
}

exports.all = async ( req, res ) => {

	try {

		// get all data book
		const dataBook = await Book.findAll()

		return res.status(200).json({
			status: 200,
			success: true,
			message: '',
			data : { book : dataBook }
		})
	}

	catch ( err ) {
		console.log(err)

		return res.status(500).json({
			status: 500,
			success: false,
			message: 'Internal Server Error'
		})
	}

}