const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Please add title of the book'],
        unique: true
    },
    author: {
        type: String,
        require: [true, 'Please add the author name']
    },
    genre: {
        type: String,
        require: [true, 'Please add a genre'],
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Books", booksSchema);