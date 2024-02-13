// import router
const router = require('express').Router()

// get list controller
const {
    create
} = require('../../controllers/v1/authController')


// set route
router.post('/register', create)

module.exports = router