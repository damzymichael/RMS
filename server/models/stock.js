const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
}, {timestamps: true});

module.exports = mongoose.model('Stock', stockSchema)