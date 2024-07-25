const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Get all books");
})

router.post('/', (req, res) => {
    res.send("Create Book listing");
})

router.put('/:id', (req, res) => {
    res.send("Update Book listing");
})

router.delete('/:id', (req, res) => {
    res.send("Delete Book listing");
})

module.exports = router;