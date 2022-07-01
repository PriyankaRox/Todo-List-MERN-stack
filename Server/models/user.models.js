const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minlength: [3, "name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    password: { 
        type: String,
        required: [true, "Password is required"],
    },
    confirmPassword: { 
        type: String,
        required: [true, "Password is required"],
    },
}, { timestamps: true });

module.exports.user = mongoose.model('user', userSchema);