// import router
const router = require('express').Router()

// get list controller
const {
    create
} = require('../../controllers/v1/registerController')


// set route
router.post('/register', create)

module.exports = router