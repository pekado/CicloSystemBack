const mongoose = require('mongoose');
const moment = require('moment')

const WorkSchema = mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type: Date,
        default: () => moment().format("L")
    },
    entregaDia:{
        type: Date,
        required: true,
        default: () => moment().format('L') 
    },
    entregaHora:{
        type: String,
        required: true
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