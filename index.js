require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env['PORT'] || 3000
const cors = require('cors')
const jwt = require('jsonwebtoken')

// set cors
app.use(cors())

// import model connect db
const database = require('./database')

database
    .sync({ force: false })
    .then(() => {
        console.info("database synced")
    })
    .catch((err) => {
        console.error("failed tp sync database: " + err.message)
    })


app.get('/', (req, res) => {
    res.send('Welcome to Core API using expressJs')
})

console.log(new Date())

// define secret key
const secretKey = process.env.KEY

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const token = req.header('token');
    if (!token) return res.status(401).json({ message: 'Authentication failed' });
  
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();

    } catch (error) {
      res.status(400).json({ message: 'Invalid token' });
    }
};

// import body parser
const bodyParser = require('body-parser')

// set parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// set parse application/json
app.use(bodyParser.json())

// IMPORT ROUTER API
// import route posts
const postsRouter = require('./routes/v1/posts')
app.use('/api/posts', postsRouter)

// import route book
const bookRouter = require('./routes/v1/book')
app.use('/api/books', bookRouter)

// import route user
const userRouterV1 = require('./routes/v1/user')
app.use('/api/v1/users', authenticateJWT, userRouterV1)

// import route auth register
const authRouterV1 = require('./routes/v1/register')
app.use('/api/v1', authRouterV1)

// import route auth login
// this route using authenticated for check token user
const authLoginV1 = require('./routes/v1/login')
app.use('/api/v1', authLoginV1)

// import route encode
const encodeRouter = require('./routes/baseData')
app.use('/api/data', encodeRouter)
// END IMPORT ROUTER API

// set listen port and render to console server
app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`)
})