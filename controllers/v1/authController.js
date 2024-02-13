// init model
const User = require('../../models/user')

// store method for register user
exports.create = async (req, res) => {

    try {
        // init param body
        const { username, email, password } = req.body

        // store data book
        const userRegistered = await User.create({
            username,
            email,
            password
        })

        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Register User berhasil',
            data: { userRegistered }
        })
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        })
    }
}