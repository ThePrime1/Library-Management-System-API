const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add First name!']
    },
    lastName: {
        type: String,
        required: [true, 'Please add Last name!'],
    },
    email: {
        type: String,
        required: [true, 'Please add email!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add password!'],
    },
    role: {
        type: String,
        required: [true, 'Please add a role'],
        default: 'user'
    },
    borrowedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Books'
        }
    ]

},

    {
        timestamps: true
    }

)


module.exports = mongoose.model('User', userSchema);