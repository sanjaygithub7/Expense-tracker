const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //id from usermodel
        ref: 'User',                  // create relationship between usermodel
        required: true, 
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Transport', 'Bills', 'Entertainment', 'Fitness', 'Others'], 
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    note: {
        type: String,
        trim: true,
        maxlength: 500, // Optional field for notes
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Expense', expenseSchema);
