const express = require('express');
const router = express.Router()

const productsRouter = require('../routes/products')
const categoryRouter = require('../routes/category')
const detTransRouter = require('../routes/detailtransactions')
const paymentRouter = require('../routes/payment')
const transactionsRouter = require('../routes/transactions')
const UserRouter = require('../routes/users');

router
.use('/products', productsRouter)
.use('/category', categoryRouter)
.use('/transactions', transactionsRouter)
.use('/payment', paymentRouter)
.use('/detailtransactions', detTransRouter)
.use('/users', UserRouter)

module.exports = router