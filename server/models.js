const mongoose = require("mongoose");


const schema = new mongoose.Schema({
  category: {
    type: String,
  },
  amount: {
    type: Number,
  },
  name: {
    type: String,
  },
});


const productModel = mongoose.model("Product", schema);

module.exports = productModel;