// import router
const router = require('express').Router()

// get list controller
const {
    login
} = require('../../controllers/v1/loginController')


// set route
router.post('/login', login)

module.exports = router