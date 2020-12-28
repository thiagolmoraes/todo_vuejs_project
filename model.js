const mongoose = require("mongoose")

//Schema

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    // done: {
    //   type: Number,
    //    required: true
    // },
    date: {
        type: Date,
        default: Date.now
    }
})

const TodoTask = mongoose.model("TodoTask", TodoSchema)

module.exports = { TodoTask }