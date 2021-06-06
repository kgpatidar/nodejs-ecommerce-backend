const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  cartData: [
    {
      productid: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      productImage: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = Cart = mongoose.model("cart", CartSchema);
