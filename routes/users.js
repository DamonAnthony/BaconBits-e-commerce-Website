const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// Register a user
router.post(
  "/",
  [
    check("username", "Please enter username").not().isEmpty(),
    check("email", "Please enter valid email").isEmail(),
    check(
      "password",
      "Please enter a password of aleast 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        username,
        email,
        password,
      });

      const sugar = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, sugar);

      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
