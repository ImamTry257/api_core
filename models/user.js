const { DataTypes } = require('sequelize')
const db = require('../database/index')

// create model for structure table tbl_user
const User = db.define('tbl_user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deleteAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

module.exports = User