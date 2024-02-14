// import router
const router = require('express').Router()

// get list controller
const {
    create,
    login
} = require('../../controllers/v1/authController')


// set route
router.post('/register', create)
router.post('/login', login)

module.exports = router