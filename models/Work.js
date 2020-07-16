const mongoose = require('mongoose');
const moment = require('moment')

const WorkSchema = mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type: Date,
        default: Date.now()
    },
    entrega:{
        type: Date,
        required: true,
    },
    cliente:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Clients"
    },
    state:{
        type: Boolean,
        default: false,
    }
})
module.exports = mongoose.model('Work', WorkSchema)