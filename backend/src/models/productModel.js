const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true,
    },
    publicId:{
        type:String,
    },
    imageUrl:{
        type:String,
        required: false
    }
},{timestamps:true})

const Product = mongoose.model('Product', productSchema)

module.exports = Product