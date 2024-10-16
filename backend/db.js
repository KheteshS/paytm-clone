const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:0tSbXn4rJk4wsrwK@100xlearningdemo.i1btdtd.mongodb.net/payTm"
);

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = new mongoose.model("Account", accountSchema);

const User = mongoose.model("User", userSchema);

module.exports = { User, Account };
