const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json({ error: "Authentication required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await Users.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    if (error.message === "jwt expired")
      return res
        .status(404)
        .json({ error: "Session expired, login again to continue" });

    res.status(404).json({ error: "Authentication error" });
    // throw Error ('Authentiction Error')
  }
};

module.exports = requireAuth;
