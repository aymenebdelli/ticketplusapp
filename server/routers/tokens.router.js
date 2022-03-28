require('dotenv').config()
const express = require('express')
const router = express.Router()

const { verifyRefreshJWT, createAccessJWT } = require('../helpers/jwt.helper')
const { getUserByEmail } = require("../modules/user/User.model")

router.get("/", async (req, res, next) => {
    const { authorization } = req.headers

    const decoded = await verifyRefreshJWT(authorization)

    // check if jwt exist in DB

    if (decoded.email) {
        const userProf = await getUserByEmail(decoded.email)
        if (userProf._id) {

            //token date existence
            let tokenExpire = userProf.refreshJWT.addTime
            const dBrefreshToken = userProf.refreshJWT.token
            //(++)change number type
            tokenExpire = tokenExpire.setDate(tokenExpire.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY)
            // console.log(new Date(tokenExpire))
            const today = new Date()

            if (dBrefreshToken !== authorization && tokenExpire < today) {
                return res.status(403).json({ message: "Forbidden" })
            }
            const accessJWT = await createAccessJWT(
                decoded.email,
                userProf._id.toString()
            )

            return res.status(200).json({ status: true, accessJWT });

        }
    }

    res.status(403).json({ message: 'Forbidden!' })
})

module.exports = router