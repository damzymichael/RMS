require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/user");
const stockRoutes = require("./routes/stock");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

//express app
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  //just added
  console.log(req.body)
  // console.log(res.json)
  next();
});

//routes
app.use("/rms/stock", stockRoutes);
app.use("/rms/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    //listen for request after connection to databse is made
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
