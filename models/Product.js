const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trimmed: true
    },
    price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now()
    },
    imageData:{
        type: String,
        required: true
    }

})
module.exports = mongoose.model("Product", ProductSchema)