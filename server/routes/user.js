const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ status: "Success", user });
  } catch (err) {
    res.status(400).json({ status: "Error", error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password }).select("-password");
    if (!user) {
      return res.status(404).json({ status: "Error", error: "User not found" });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, "SECRET_kEY", {
      expiresIn: "1h",
    });
    res.status(200).json({ status: "Success", user, token });
  } catch (err) {
    res.status(400).json({ status: "Error", error: err.message });
  }
});

module.exports = userRouter;
