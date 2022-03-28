require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 6000
const bodyParser = require("body-parser")
const morgan = require("morgan");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const timeout = require('connect-timeout')
const helmet =require('morgan')

//API security
app.use(helmet());

const haltOnTimedOut=(req, res, next)=> {
  if (!req.timedOut) next()
}

app.use(timeout('5000ms'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(haltOnTimedOut)
app.use(cookieParser())
app.use(haltOnTimedOut)

//handle CORS error
app.use(cors());


//database(MongoDB) Connection Setup
const mongoose = require("mongoose");

// if (process.env.NODE_ENV !== "production") {
//   mongoose
//   .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('mongoDB connected...');
//   })
//   .catch((err) => console.log(err));
//   //Logger
//   app.use(morgan("tiny"));
// }
mongoose
  .connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true ,
    useUnifiedTopology: true })
  .then(() => {
    console.log('mongoDB connected...');
  })
  .catch((err) => console.log(err));
  


// Set body bodyParser

app.use(bodyParser.json());



// load routers
const userRouter = require('./routers/user.router')
const ticketRouter = require('./routers/ticket.router')
const tokensRouter = require("./routers/tokens.router")

//use routers
app.use('/api/user', userRouter)
app.use('/api/ticket', ticketRouter)
app.use("/api/tokens", tokensRouter)

// Error handler
const handleError = require('./utils/errorHandler')

app.use((req, res, next) => {
  const err = new Error('Resources not found!')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  handleError(err, res);
})


app.listen(port, () => {
  console.log(`server is running on port :${port}`)
})
