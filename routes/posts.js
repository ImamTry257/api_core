const express = require('express')
const router = express.Router()
const moment = require('moment')

// import express validator
const { body, validationResult } = require('express-validator')

// import DB
const con = require('../configs/database.config')


// index post
router.get('/', (req, res) => {
    // query
    con.query('SELECT * FROM tbl_posts as s WHERE s.deleted_at IS NULL ORDER BY id DESC', (err, rows) => {
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
    con.query('insert into tbl_posts set ?', formData, function (err, rows) {

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

// show post
router.get('/(:id)', function(req, res){

    let id = req.params.id
    console.log(id)

    con.query(`select * from tbl_posts as s where s.id = ${id}`, function ( err, rows ) {
        // check error
        if (err) {
            // debug error message
            console.log(err)

            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        }

        // check data
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Post Not Found!',
            })
        }else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Post',
                data: rows[0]
            })
        }
    } )
})


// update post
router.patch('/update/:id', [

    // validation
    body('title').notEmpty(),
    body('content').notEmpty()

], (req, res) => {

    const errors = validationResult(req)

    // send error message
    if ( !errors.isEmpty() ) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    let id = req.params.id

    // set obj formData
    let formData = {
        title: req.body.title,
        content: req.body.content,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    console.log(formData)

    // insert data
    con.query(`update tbl_posts as s set ? where s.id = ${id}`, formData, function (err, rows) {

        if ( err ) {
            console.log(err)
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        }else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully',
                data: formData
            })
        }
    })
})

// softdelete
router.post('/delete/(:id)', function(req, res) {
    
    let id = req.params.id

    let formData = {
        deleted_at: moment().format('YY-MM-DD HH:mm:ss')
    }

    con.query(`update tbl_posts as s set ? where s.id = ${id}`, formData, function(err, rows) {

        if ( err ) {
            console.log(err)
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            })
        }else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully',
                data: formData
            })
        }
    })
})

module.exports = router;