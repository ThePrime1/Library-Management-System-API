const asyncHandler = require("express-async-handler");

const adminAuth = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(400)
        throw new Error("Forbidden!")
    }
})

module.exports = { adminAuth };