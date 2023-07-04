const Stock = require("../models/stock");
const mongoose = require("mongoose");

const getStock = async (req, res) => {
  const stocks = await Stock.find({}).sort({ createdAt: -1 });
  if (stocks.length < 1)
    return res.status(200).json({ stocks, message: "No available Stock" });
  res.status(200).json({ stocks, message: "Success" });
};

const getSingleStock = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Stock not available" });
  }

  const stock = await Stock.findById(id);

  if (!stock) {
    return res.status(404).json({ error: "Stock not available" });
  }

  res.status(200).json(stock);
};

const createStock = async (req, res) => {
  const { title, price, type, quantity } = req.body;
  let emptyFields = [];
  if (!title) emptyFields.push("title");

  if (!price) emptyFields.push("price");

  if (!type) emptyFields.push("type");

  if (!quantity) emptyFields.push("quantity");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  const exists = await Stock.findOne({ title });
  if (exists) {
    return res
      .status(400)
      .json({ error: "Stock already exists, update Stock" });
  }
  //add to db
  try {
    const stock = await Stock.create({ title, price, type, quantity });
    res.status(200).json({ stock, message: "Created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStock = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Stock doesn't exist" });
  }

  const stock = await Stock.findOneAndDelete({ _id: id });

  if (!stock) {
    return res.status(400).json({ error: "Stock doesn't exist" });
  }

  res.status(200).json({ stock, message: "Stock deleted Successfully" });
};

const updateStock = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Stock not available" });
  }
  //check if no changes are made
  // const stock = await Stock.findById(id);

  //check if title exists
  const stock = await Stock.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!stock) {
    return res.status(400).json({ error: "Stock not available" });
  }

  res.status(200).json({ stock, message: "Updated successfully" });
};

module.exports = {
  getStock,
  getSingleStock,
  createStock,
  deleteStock,
  updateStock,
};
