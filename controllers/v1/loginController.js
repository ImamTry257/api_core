// init model
const moment = require('moment')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

// login user
exports.login = async (req, res) => {

    try {
        const { username, password } = req.body

        // check user by username and password
        const userExisting = await User.findOne({
            where : {
                username : username,
                password : password
            }
        })

        if ( userExisting == null ) return res.status(401).json({ message: 'Username or Password is wrong' });
        
        const userId = userExisting.id

        // generate token, and insert to column remember token
        const remember_token = jwt.sign({
            id: userId,
            username: userExisting.username,
            accessTime: moment().format('YYYY-MM-DD HH:mm:ss')
        }, process.env.KEY)

        // update token to user existing
        await User.update({
            remember_token
        }, {
            where: {
                id : userId
            }
        })

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Login berhasil',
            data: { token : remember_token }
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        })
    }
}