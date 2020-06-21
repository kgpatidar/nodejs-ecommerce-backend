const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  brandOwner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  description: {
    type: String,
    default: "",
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Brand = mongoose.model("brand", BrandSchema);
