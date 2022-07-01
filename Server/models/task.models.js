const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "task Name is required"],
        minlength: [3, "title must be at least 3 characters long"]
    },
    category: {
        type: String,
        required: [true, "category is required"],
        minlength: [3, "category must be at least 3 characters long"]
    },
    due: { 
        type: Date,
        required: [true, "Due date is required"],
    },
    priority: { 
        type: String,
        required: [true, "priority is required"],
    },
    done: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports.task = mongoose.model('task', tasksSchema);