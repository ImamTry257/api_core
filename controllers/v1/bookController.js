// init model
const Book = require('../../models/book')

// store method
exports.create = async (req, res) => {

	try {
		// init param body
		const { title, author, summary, publisher } = req.body

		if ( title == undefined || author == undefined || summary == undefined || publisher == undefined ) return res.status(200).json({
			status: false,
			code: 403,
			message: 'Parameter not valid'
		})

		// store data book
		const bookCreate = await Book.create({
			title,
			author,
			summary,
			publisher
		})

		return res.status(200).json({
			status: true,
			code: 201,
			message: 'Data Buku berhasil dibuat',
			data: { bookCreate }
		})
	} catch (err) {
		console.log(err)

		return res.status(200).json({
			status: false,
			code: 500,
			message: 'Internal Server Error'
		})
	}
}

exports.all = async (req, res) => {

	try {

		// get all data book
		const dataBook = await Book.findAll()

		return res.status(200).json({
			status: 200,
			success: true,
			message: '',
			data: { book: dataBook }
		})
	}

	catch (err) {
		console.log(err)

		return res.status(500).json({
			status: 500,
			success: false,
			message: 'Internal Server Error'
		})
	}

}

// find by id
exports.find = async (req, res) => {
	try {

		const { id } = req.params

		// find book by id
		const book = await Book.findOne({
			where: {
				id: id
			}
		})

		// check data book
		if (!book) { // empty data

			return res.status(404).json({
				status: 404,
				success: false,
				message: 'Data not found'
			})
		} else {

			return res.status(200).json({
				status: 200,
				success: true,
				data: {
					book: book
				}
			})

		}
	} catch (err) {
		console.log(err)

		return res.status(500).json({
			status: 500,
			success: false,
			message: 'Internal Server Error'
		})
	}
}

// update data
exports.update = async (req, res) => {

	try {

		let { id } = req.params

		let { title, author, summary, publisher } = req.body

		// update data
		const updateBook = await Book.update(req.body, {
			where: {
				id: id
			}
		})

		// check status update data
		if (!updateBook[0]) {
			return res.status(200).json({
				success: false,
				status: 200,
				message: 'Update data book failed'
			})
		}

		return res.status(200).json({
			success: true,
			status: 200,
			message: 'Update data book successfully'
		})

	} catch (err) {
		console.log(err)

		return res.status(500).json({
			status: 500,
			success: false,
			message: 'Internal Server Error'
		})
	}
}