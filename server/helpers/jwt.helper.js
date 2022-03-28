require('dotenv').config()
const jwt = require('jsonwebtoken')
const { setJWT, getJWT } = require('./redis.helper')
const { storeUserRefreshJWT } = require('../modules/user/User.model')
const { token } = require("morgan")


const createAccessJWT = async (email, _id) => {

    try {
        const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, { expiresIn: "1h" })
        // stored inside Redis DB
        await setJWT(accessJWT, _id)
        return Promise.resolve(accessJWT)
    } catch (err) {
        return Promise.reject(err)
    }
}

const createRefreshJWT = async (email, _id) => {
    // console.log(_id)
    try {
        const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" })
        // refresh token stored in MDB
        await storeUserRefreshJWT(_id, refreshJWT)
        return Promise.resolve(refreshJWT)
    } catch (err) {
        return Promise.reject(err)
    }
}

// function verify jwt token 
const verifyAccessJWT = (userJWT) => {
    try {
        //built-in verifying
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET))

    } catch (err) {
        Promise.resolve(err)
    }
}

const verifyRefreshJWT = (userJWT) => {
    try {
        //built-in verifying
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET))
    } catch (err) {
        Promise.resolve(err)
    }
}

module.exports = { createAccessJWT, createRefreshJWT,verifyAccessJWT,verifyRefreshJWT }
