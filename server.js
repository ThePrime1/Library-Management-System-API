const express = require("express");
const dotenv = require("dotenv").config()
const app = express();
const { errorHandler } = require("./backend/middleware/errorMiddleware");
const connectDB = require("./backend/config/db");


connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/users', require('./backend/routes/userRoute'));
app.use('/api/books', require("./backend/routes/booksRoute"));

app.use(errorHandler);

app.listen(process.env.PORT, (req, res) => {
    console.log("Server started on PORT: ", process.env.PORT);
})
