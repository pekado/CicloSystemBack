const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: Boolean,
    default: false
  },
   price: {
     type: Number,
     required: true
   },
  created: {
    type: Date,
    default: Date.now()
  },
  work: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Works"
  }
});
module.exports = mongoose.model("Task", TaskSchema);
