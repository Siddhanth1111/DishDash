// routes/user.js or similar
const express = require("express");
const router = express.Router();

const {User} = require("../db")

router.post("/", async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    // Optional: Prevent duplicate users
    const existingUser = await User.findOne({phone});
    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    const newUser = new User({ name, phone });
    await newUser.save();
    res.status(201).json({ message: "User saved", user: newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error saving user", error });
  }
});

module.exports = router;
