const express = require('express')
const router = express.Router()
const Carts = require('../model/cart')

router.get('/carts', async (req, res) => {
	const carts = await Carts.find()
	if (!carts) {
		return res.status(404).send("No Products Found")
	}
	res.send(carts)
})

router.post('/save-cart', async (req, res) => {
	const data = req.body
	let saveCart = new Carts({
		cart: data.cart
	})

	try {
		saveCart = await saveCart.save()
		res.status(200).send(saveCart)
	}
	catch (err) {
		res.status(404).send(err.message)
	}
})

router.delete('/del-cart/:id', async (req, res) => {
	let cart = await Carts.findByIdAndDelete(req.params.id)
	if (!cart) {
		return res.send("No Product Found In Cart")
	}
	res.send("Product has been deleted!")
})

module.exports = router