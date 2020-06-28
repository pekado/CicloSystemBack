const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    phone:{
        type: String,
        trim: true,
        required: true
    },
    bike:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('Client', ClientSchema)