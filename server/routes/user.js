const express = require("express");
const router = express.Router();
const { createUser, signUserIn } = require("../controllers/userController");

//login route
router.post("/login", signUserIn);

//signup route
router.post("/signup", createUser);

module.exports = router;
