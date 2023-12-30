// import router
const router = require('express').Router()

// get list controller
const {
	all,
	create
} = require('../controllers/bookController')


// set route
router.get('/', all)
router.post('/store', create)

module.exports = router