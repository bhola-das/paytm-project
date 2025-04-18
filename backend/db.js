// backend/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const transactionSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["deposit", "transfer"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);
const Transaction=mongoose.model("Transaction", transactionSchema);

module.exports = {
	User,
    Account,
    Transaction
};