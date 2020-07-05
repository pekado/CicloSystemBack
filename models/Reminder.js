const mongoose = require("mongoose")

const ReminderSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Reminder", ReminderSchema)