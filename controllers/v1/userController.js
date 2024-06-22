// init model
const User = require('../../models/user')

exports.all = async (req, res) => {

    try {

        // get all data user
        const dataUser = await User.findAll()

        return res.status(200).json({
            status: 200,
            success: true,
            data: { user: dataUser }
        })
    }

    catch (err) {
        console.log(err)

        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Internal Server Error'
        })
    }

}