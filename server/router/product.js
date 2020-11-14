const express = require('express')
const router = express.Router()
const Products = require('../model/product')


router.get('/products', async(req, res) => {

	const products = await Products.find().sort({itemName: 1})
	if(!products){
		return res.status(404).send("No Products Found")
	}
	res.send(products)
})

router.get('/product/:id', async(req, res) => {
	const id = req.params.id
	const product = await Products.findById({_id: id})
	if(!product){
		return res.status(404).send("No Products Found")
	}
	res.send(product)
})

router.get('/products/:category', async(req, res) => {
	console.log(req.params);
	const category = req.params.category
	if(category !== 'All'){
		const product = await Products.find({category: category}).sort({itemName: 1})
		if(!product){
			return res.status(404).send("No Products Found")
		}
		res.send(product)
	}
	else{
		const product = await Products.find().sort({itemName: 1})
		if(!product){
			return res.status(404).send("No Products Found")
		}
		res.send(product)
	}
})

router.post('/save-product', async (req, res) => {
	const data = req.body
console.log(data);
	let product = new Products({
		imageURI: data.imageURI,
		category: data.category,
		itemName: data.itemName,
		amount: data.amount,
		details: data.details
	})

	try{
		product = await product.save()
		res.status(200).send(product)
	}
	catch (err) {
		res.status(404).send(err.message)
	}

})

module.exports = router