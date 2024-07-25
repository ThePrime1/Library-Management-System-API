const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



const registerUser = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, password, role, borrowedBooks } = req.body;

    // Validating field
    if (!firstName || !lastName || !email || !password) {
        res.status(400)
        throw new Error("Please fill out the form then submit!");
    }

    // Checking if user already exists
    const userAlreadyRegistered = await User.findOne({ email });
    if (userAlreadyRegistered) {
        res.status(401)
        throw new Error("User already exist!");
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user in the db
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        borrowedBooks
    })

    // Return a response if user created
    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName,
            lastName,
            email,
            role,
            borrowedBooks,
            token: generateToken(user._id)
        })
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Ivalid credentials')
    }
})

const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.firstName,
        email: req.user.email,
        role: req.user.role,
        borrowedBooks: req.user.borrowedBooks
    }
    res.status(200).json(user)
})

const update = asyncHandler(async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(req.user.id, firstName, lastName);

    res.status(200).json({ success: true });
})

const deleteMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(400)
        throw new Error("User does not exist!");
    }

    await user.remove();
    res.status(200).json({ success: true });
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if (!users) {
        res.status(400)
        throw new Error("No users found!");
    }

    res.json(users);
})


const resetPassword = asyncHandler(async (req, res) => {

}
)


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}



module.exports = {
    registerUser,
    loginUser,
    getMe,
    update,
    deleteMe,
    getAllUsers,
    resetPassword
}