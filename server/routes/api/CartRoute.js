const express = require("express");
const middleware = require("../../middleware/middleware");
const router = express.Router();

const Cart = require("../../model/Cart");
const User = require("../../model/User");

// Add to Cart
router.post("/addtocart", middleware, async (req, res) => {
  const { productid, name, price, productImage } = req.body;

  const cartProduct = {
    productid,
    name,
    price,
    productImage,
  };

  const resCart = await Cart.findOne({ user: req.user.id });
  if (!resCart) {
    const newCart = new Cart({
      user: req.user.id,
      cartData: { productid, name, price, productImage },
    });
    await newCart.save();
    return res.send(newCart.cartData);
  }

  resCart.cartData.unshift(cartProduct);
  await resCart.save();
  res.send(resCart.cartData);
});

// getCartData
router.get("/getcart", middleware, async (req, res) => {
  const response = await Cart.findOne({ user: req.user.id });
  res.send(response.cartData);
});

router.get("/updatecart/:prodid", middleware, async (req, res) => {
  const response = await Cart.find({
    user: req.user.id,
    "cartData.productid": req.params.prodid,
  });
  res.json(response);
});

module.exports = router;
