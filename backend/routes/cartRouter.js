const express = require('express')
const authMiddleware = require('../middlewares/auth')
const  {addToCart,getCart,removeFromCart} = require('../controllers/cartController')

const cartRouter = express.Router()
cartRouter.post('/add',authMiddleware,addToCart)
cartRouter.get('/get',authMiddleware,getCart)
cartRouter.delete('/remove',authMiddleware,removeFromCart)

module.exports = cartRouter