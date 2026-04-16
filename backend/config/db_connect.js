const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)

const Note = mongoose.model("Note", {
    filename: String,
    text: String
})

module.exports = Note