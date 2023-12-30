require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env['PORT'] || 3000
const cors = require('cors')

// set cors
app.use(cors())

// import model connect db
const database = require('./database')

database
    .sync({ force: false })
    .then( () => {
        console.info("database synced")
    })
    .catch( (err) => {
        console.error("failed tp sync database: " + err.message)
    })


app.get('/', (req, res) => {
    res.send('Hello World! 2024')
})


// import body parser
const bodyParser = require('body-parser')

// set parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false }))

// set parse application/json
app.use(bodyParser.json())


// IMPORT ROUTER API

// import route posts
const postsRouter = require('./routes/posts')
app.use('/api/posts', postsRouter)

// import route book
const bookRouter = require('./routes/book')
app.use('/api/books', bookRouter)

// END IMPORT ROUTER API


// set listen port and render to console server
app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`)
})