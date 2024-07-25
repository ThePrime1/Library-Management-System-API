const asyncHandler = require("express-async-handler");
const Books = require("../models/bookModel");


// Create book listing
// Only admins will be able to do it
const createListing = asyncHandler(async (req, res) => {
    const { title, author, genre, numberOfBooksAvailable } = req.body;

    if (!title || !author || !genre) {
        res.status(400)
        throw new Error("Please add all fields!");
    }

    const bookExists = await Books.findOne({ title });
    if (bookExists) {
        res.status(400)
        throw new Error("Book already exists in the Database");
    }

    const book = await Books.create({
        title,
        author,
        genre
    });

    if (book) {
        res.status(201).json({
            _id: book._id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            isAvailable: book.isAvailable
        })
    }
})


const getBooks = asyncHandler(async (req, res) => {
    const books = await Books.find();

    if (!books) {
        res.status(400)
        throw new Error("No books available!");
    }

    res.status(200).json(books);
})

module.exports = {
    createListing,
    getBooks
}