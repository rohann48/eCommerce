const mongoose = require('mongoose')
const express = require('express')
const app = express()
const products = require('./router/product')
const carts = require('./router/cart')

//mongodb connection
mongoose.connect('mongodb://localhost:27017/Ecommerce', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
	.then(() => {
		console.log('Connected to mongodb')
	})
	.catch(err => console.log('Error in Connecting...', err))

//middleware
app.use(express.json({limit: '16mb'}))
app.use(express.urlencoded({limit: '16mb', extended: false }))
app.use('/api', products)
app.use('/api', carts)

//setting port
const port = process.env.PORT || 8080
app.listen(port, () => {
	console.log(`Connected To Port ${port}`)
})