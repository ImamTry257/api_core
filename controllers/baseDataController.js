// import { getSHA256Hash } from "boring-webcrypto-sha256"
const { createHash } = require('crypto');

// store method for register user
const encode = async (req, res) => {

    try {
        // init param body
        const { plaint_text } = req.body

        // encode data
        // const encodeData = await Buffer.from(plaint_text, 'binary').toString('SHA-256')
        const encodeData = createHash('sha256').update(plaint_text).digest('hex');

        return res.status(201).json({
            status: 201,
            success: true,
            message: 'Encode data berhasil',
            data: { encodeData }
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

module.exports = {encode};