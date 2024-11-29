const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [8, "Username should have atleast 8 charecters"],
    unique: true,
    trim: true,
    validate: {
      validator: (username) => /^[A-Za-z0-9]+$/.test(username),
      message: (props) =>
        `${props.value} is not a valid username. Username should only contain Alphabets and Numbers`,
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: (email) =>
        /^[A-Za-z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(email),
      message: (props) => `${props.value} is not a valid email.`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password should have atleast 8 charecters"],
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
