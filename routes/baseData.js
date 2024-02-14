// import router
const router = require('express').Router()

// get list controller
const {
    encode
} = require('../controllers/baseDataController')


// set route
router.post('/encode', encode)

module.exports = router