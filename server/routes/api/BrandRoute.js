const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const Brand = require("../../model/Brand");
const middleware = require("../../middleware/middleware");

// Adding Brand {Private}
router.post(
  "/addbrand",
  [
    middleware,
    [
      check("name", "Brand Name is Required").not().isEmpty(),
      check("email", "Brand Email is Not Valid").isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, description } = req.body;

      const brand = new Brand({
        name,
        email,
        brandOwner: req.user.id,
        description,
      });

      await brand.save();
      return res.json({ msg: "Brand Registerd" });
    } catch (err) {
      return res.json([{ errors: { msg: "Brand Not Registed" } }]);
    }
  }
);

module.exports = router;
