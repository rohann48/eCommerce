const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    imageURI: {
        type: String,
        required: true
    },
    category:{
        type: String
    },
    itemName:{
        type: String
    },
    amount:{
        type: Number
    },
    details:{
        type:String
    }
})

const Products = mongoose.model('product', productSchema)

module.exports = Products