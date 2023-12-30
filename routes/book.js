// import router
const router = require('express').Router()

// get list controller
const {
	all,
	create,
	find,
	update
} = require('../controllers/bookController')


// set route
router.get('/', all)
router.post('/store', create)
router.get('/:id', find)
router.put('/update/:id', update)

module.exports = router