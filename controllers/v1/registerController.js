// init model
const User = require('../../models/user')

// store method for register user
exports.create = async (req, res) => {

    try {
        // init param body
        const { username, email, password } = req.body

        // check user by username
        const checkUser = await User.findOne({
            where : {
                username : username
            }
        })

        let dataRes
        if ( checkUser != null ) {
            dataRes = {
                status: false,
                code: 401,
                message: 'Username already registered'
            }

        } else {
            // store data book
            const userRegistered = await User.create({
                username,
                email,
                password
                // remember_token
            })

            dataRes = {
                status: true,
                code: 201,
                message: 'Register User berhasil',
                data: { userRegistered }
            }
        }

        return res.status(200).json(dataRes)
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        })
    }
}