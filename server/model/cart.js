const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    cart:{
        type: Array
    }
})

const Carts = mongoose.model('cart', cartSchema)

module.exports = Carts