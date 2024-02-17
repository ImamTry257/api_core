// store method for register user
exports.encode = async (req, res) => {

    try {
        // init param body
        const { plaint_text } = req.body

        // encode data
        const encodeData = await Buffer.from(plaint_text, 'binary').toString('base64')

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