const mongoose = require('mongoose')
const express = require('express')
const app = express()

//mongodb connection
mongoose.connect('mongodb://localhost/Ecommerce', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
				.then(()=> {
						console.log('Connected to mongodb')
					})
				.catch(err => console.log('Error in Connecting...', err))


app.get('/', (req, res)=>{
    res.send("Hello")
})

const port = process.env.PORT || 3001
app.listen(port, () =>{
    console.log(`Connected To Port ${port}`)})