const express = require("express")
const Note = require("./config/db_connect")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/:filename", async function (req, res) {
    const filename = req.params.filename
    
    const note = await Note.findOne({filename})
    
    if(note) {
        return res.status(200).json({text: note.text})
    }

    const newNote = await Note.create({
        filename: filename,
        text: ""
    })

    return res.status(200).json({text: newNote.text})
})

app.post("/:filename", async function (req, res) {
    const text = req.body.text
    const filename = req.params.filename

    const updatedNote = await Note.findOneAndUpdate({filename}, {text})

    return res.status(201).json({text: updatedNote.text})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`)
})
