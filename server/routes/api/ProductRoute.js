const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { check, validationResult } = require("express-validator");

const Product = require("../../model/Product");
const middleware = require("../../middleware/middleware");

// Image Uploading Storage
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/productimage");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, "_"));
  },
});

// Image Filteration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1080 * 1080 * 1,
  },
});

// Upload Product Image
router.post(
  "/uploadimage",
  [middleware, upload.single("file")],
  async (req, res) => {
    return res.json({
      success: true,
      path: "/productimage/" + req.file.originalname.replace(/ /g, "_"),
    });
  }
);

// Adding Product {Private}
router.post(
  "/addproduct",
  [
    middleware,
    [
      check("name", "Product Name is Required").not().isEmpty(),
      check("brand", "Brand Name is Required").not().isEmpty(),
      check("price", "Brand Price is Required").not().isEmpty(),
      check("quantity", "Quantity is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Error Returning
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({ errors: error.array() });
    }
    try {
      const {
        name,
        brand,
        description,
        textdesc,
        price,
        quantity,
        productImage,
      } = req.body;

      const product = new Product({
        name,
        brand,
        description,
        textdesc,
        price,
        quantity,
        productImage,
      });

      const response = await product.save();
      return res.json({ msg: "Product Added" });
    } catch (err) {
      res.status(500).send("Product Not Added");
    }
  }
);

// Get Product List
router.get("/productlist", async (req, res) => {
  try {
    const product = await Product.find({});
    res.json(product);
  } catch (err) {
    return res.json({ errors: [{ msg: "Server Not Responding" }] });
  }
});

module.exports = router;
