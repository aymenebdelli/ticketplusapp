const express = require('express')
const router = express.Router()
const redis = require("redis")
const session = require('express-session')
const redisStore = require('connect-redis')(session)
const client = redis.createClient()
const app = express()
const { route, post } = require("./ticket.router");

app.use(session({
	secret: process.env.JWT_ACCESS_SECRET,
	// create new redis store.
	store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
	saveUninitialized: false,
	resave: false
}))

const { insertUser, getUserByEmail, getUserById, updatePassword, storeUserRefreshJWT, verifyUser } = require('../modules/user/User.model')
const { hashPassword, comparePassword } = require('../helpers/bcrypt.helper')
const { createAccessJWT, createRefreshJWT } = require('../helpers/jwt.helper')
const { userAuthorization } = require('../middlewares/autorization')
const { setPasswordRestPin, getPinByEmailPin, deletePin } = require("../modules/restPin/RestPin.model")
const { resetPassReqValidation, updatePassValidation, newUserValidation } = require("../middlewares/validation")
const { verify } = require("jsonwebtoken");
const { emailProcessor } = require("../helpers/email.helper")
const { deleteJWT } = require("../helpers/redis.helper");
const verificationURL = "http://localhost:3000/verification/"


router.all('/', (req, res, next) => {
	// res.json({message:'return from user router'})
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next()
})

// get user profile
router.get("/", userAuthorization, async (req, res) => {

	const _id = req.userId
	//get the user profile
	const userProf = await getUserById(_id)
	// console.log(userProf)
	const { name, email } = userProf
	res.json({
		user: {
			_id,
			name,
			email,
		},
	});

})

// signup verification
router.patch("/verify", async (req, res) => {
	try {
		const { _id, email } = req.body
		// console.log(_id, email)
		const result = await verifyUser(_id, email);

		if (result && result.id) {
			return res.status(200).json({
				status: "success",
				message: "You account has been activated, you may sign in now.",
			})
		}

		return res.json({
			status: "error",
			message: "Invalid request!",
		})
	} catch (error) {
		console.log(error);
		return res.json({
			status: "error",
			message: "Invalid request!",
		})
	}
})

// Create user
router.post('/', newUserValidation, async (req, res) => {
	const { name, company, address, phone, email, password } = req.body

	try {

		// hash password (bcrypt)
		const hashedPass = await hashPassword(password)
		const newUserObj = { name, company, address, phone, email, password: hashedPass }

		const result = await insertUser(newUserObj)
//verification by id valid user see in box link ethereal inbox test
		await emailProcessor({
			email,
			type: "new-user-confirmation-required",
			verificationLink: verificationURL + result._id + "/" + email,
		})

		res.status(200).json({ status: true, message: 'new user created', result: result })
	} catch (err) {
		console.log(err)
		let message =
			"Unable to create new user at the moment!"
			// message ui when user register twice 
		if (err.message.includes("E11000 duplicate key error collection")) {
			message = "this email already has an account"
		}
		res.json({ status: false, message})
	}

})

// User sign in (auth)
router.post('/login', async (req, res) => {

	const { email, password } = req.body
	const red = () => { req.session.key = req.body.email }
	//comparison between password hashed, email and db user login status

	if (!email || !password) { return res.json({ status: false, message: "submission failed!" }) }

	const user = await getUserByEmail(email)
	// console.log(user)
	
	if (!user.isVerified) {
		return res.json({
			status: false,
			message:
				"You account has not been verified. Please check your email and verify you account before able to login!",
		})
	}

	const passwordDb = user && user._id ? user.password : null


	if (!passwordDb) {
		return res.json({ status: false, message: "Invalid password!" })
	}

	const result = await comparePassword(password, passwordDb)


	if (!result) {
		return res.json({ status: false, message: "Invalid email or password!" })
	}

	//create jwt authentication
	const accessJWT = await createAccessJWT(user.email, `${user._id}`)
	const refreshJWT = await createRefreshJWT(user.email, `${user._id}`)

	res.status(200).json({ status: true, message: "login successfully!", accessJWT, refreshJWT })
})

router.post("/reset-password", resetPassReqValidation, async (req, res) => {
	const { email } = req.body;

	const user = await getUserByEmail(email);

	if (user && user._id) {
		// 		// 2. create unique 6 digit pin
		const setPin = await setPasswordRestPin(email)
		await emailProcessor({
			email,
			pin: setPin.pin,
			type: "request-new-password",
		});
	}

	res.status(200).json({
		status: true,
		message:
			"If the email is exist in our database, the password reset pin will be sent shortly.",
	})
})

router.patch("/reset-password", updatePassValidation, async (req, res) => {
	//just  for test
	// 	res.json(req.body)
	// })
	const { email, pin, newPassword } = req.body;
	const getPin = await getPinByEmailPin(email, pin);
	// just  for test
	// res.json(getPin)
	// 2. validate pin
	if (getPin?._id) {
		const dbDate = getPin.addedAt
		const expiresIn = 1

		let expDate = dbDate.setDate(dbDate.getDate() + expiresIn)

		const today = new Date()

		if (today > expDate) {
			return res.status(500).json({ status: false, message: "Invalid or expired pin." })
		}

		// encrypt new password
		const hashedPass = await hashPassword(newPassword)

		const user = await updatePassword(email, hashedPass)
		// update password in data base (with nodemailer package )
		if (user._id) {
			// send email notification
			await emailProcessor({ email, type: "update-password-success" })

			//delete pin from db
			deletePin(email, pin)

			return res.status(200).json({
				status: true,
				message: "Your password has been updated",
			})
		}
	}
	res.json({
		status: false,
		message: "Unable to update your password. plz try again later",
	})
})


//User logout and invalidate jwts

router.delete("/logout", userAuthorization, async (req, res) => {
	const { authorization } = req.headers
	// 	//this data coming form database
	const _id = req.userId


	// 	// 2. delete accessJWT from redis database
	deleteJWT(authorization)

	// 	// 3. delete refreshJWT from mongodb
	const result = await storeUserRefreshJWT(_id, "")
	// console.log(result)

	if (result._id) {
		return res.status(200).json({ status: true, message: "Logged out successfully" })
	}

	res.json({
		status: false,
		message: "Unable to log you out, plz try again later",
	})
})

module.exports = router