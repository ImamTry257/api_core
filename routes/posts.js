const express = require('express')
const router = express.Router()
const moment = require('moment')

// import express validator
const { body, validationResult } = require('express-validator')

// import DB
const con = require('../config/database')


// index post
router.get('/', (req, res) => {
    // query
    con.query('SELECT * FROM tbl_posts ORDER BY id DESC', (err, rows) => {
        if ( err ) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        }else {
            return res.status(200).json({
                status: true,
                message: 'List Data Posts',
                data: rows
            })
        }
    })
})

// store post
router.post('/store', [

    // validation
    body('title').notEmpty(),
    body('content').notEmpty()
], (req, res) => {

    const errors = validationResult(req)

    if ( !errors.isEmpty() ) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    // set obj formData
    let formData = {
        title: req.body.title,
        content: req.body.content,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    console.log(formData)

    // insert data
    con.query('insert into tbl_posts set ?', formData, (err, rows) => {

        if ( err ) {
            console.log(err)
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        }else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: formData
            })
        }
    })
})

module.exports = router;