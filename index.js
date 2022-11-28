require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const createError = require('http-errors')
const app = express()
// const helmet = require("helmet")
const xss = require('xss-clean')

const mainRouter = require('./src/routes/index')
const PORT = process.env.PORT || 500
const DB_HOST = process.env.DB_HOST

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: "*"
}));
// app.use(helmet());
app.use(xss());
app.use(express.raw())

app.use(mainRouter)
app.use('/img', express.static('./upload'))


app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})
app.use((err,req,res, next)=>{
  const messageError = err.message || "internal server error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message : messageError
  })
  next()
})


app.listen(8080, () => {
  console.log(`server running on http://${DB_HOST}:${PORT}`)
})