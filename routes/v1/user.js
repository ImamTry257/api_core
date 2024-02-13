// import router
const router = require('express').Router()

// get list controller
const {
    all
} = require('../../controllers/v1/userController')


// set route
router.get('/', all)

module.exports = router