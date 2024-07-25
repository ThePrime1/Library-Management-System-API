const express = require("express");
const {
    registerUser,
    loginUser,
    getMe,
    update,
    deleteMe,
    getAllUsers,
    resetPassword } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware")
const { adminAuth } = require("../middleware/adminMiddleware");

const router = express.Router();


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/', protect, adminAuth, getAllUsers)
router.put('/:id', protect, update)
router.delete('/:id', protect, deleteMe)

module.exports = router;