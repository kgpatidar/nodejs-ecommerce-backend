const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../model/User");
const middleware = require("../../middleware/middleware");

// User Login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // If User Exist
    let user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ errors: [{ msg: "Incorrect Email or Password." }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res
        .status(400)
        .json({ errors: [{ msg: "Incorrect Email or Password." }] });
    }

    // Return JsonWebToken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Not Responding.");
  }
});

// User Detail {Private}
router.get("/me", middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
