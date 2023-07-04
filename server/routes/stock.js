const express = require("express");
const {
  getStock,
  getSingleStock,
  createStock,
  deleteStock,
  updateStock,
} = require("../controllers/stockController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//use middleware to check token before sending stocks
router.use(requireAuth) 

//get stocks
router.get("/", getStock);

//get single stock
router.get("/:id", getSingleStock);

//post stock
router.post("/", createStock);

//delete stock
router.delete("/:id", deleteStock);

//update stock
router.patch("/:id", updateStock);

module.exports = router;
