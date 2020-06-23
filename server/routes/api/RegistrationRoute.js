const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../../model/User");

// Registration
router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Please Enter Password More than 6 Character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Destructuring
    const { name, email, password } = req.body;

    // Error Returning
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }

    // User Data Putting
    const user = new User({
      name,
      email,
      password,
    });

    try {
      // If User Exist
      let ifUser = await User.findOne({ email });
      if (ifUser) {
        res.status(400).json({ errors: [{ msg: "User Already Exist" }] });
      }

      // Encrypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Saving Data to Database
      await user.save();

      //  Email To Welcome User...
      //   VerificationEmail(name, email);

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("User Not Responding");
    }
  }
);

const VerificationEmail = (name, email) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.get("appEmailId"),
      pass: config.get("appEmailPassword"),
    },
  });

  var mailOptions = {
    from: "kgStore@online.com",
    to: email,
    subject: "KgStore Account Verification Email",
    text: `Verification Email`,
    html:
      "<h1>Welcome " +
      name +
      ",</h1><h3>Thankyou for Being Member of Our Team.</h3><p>@CopyRight KgStore</p>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      //   console.log(error);
      console.log("Email Sent");
    } else {
      console.log("Email Sent");
    }
  });
};

// Export Route
module.exports = router;
