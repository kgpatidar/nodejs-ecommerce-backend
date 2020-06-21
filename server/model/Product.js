const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: mongoose.Types.ObjectId,
    ref: "brand",
  },
  description: {
    allColor: [
      {
        color: {
          type: String,
        },
      },
    ],
    size: {
      type: String,
    },
    extra: {
      type: String,
    },
  },
  textdesc: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  productImage: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
