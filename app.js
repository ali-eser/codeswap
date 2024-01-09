const express = require('express');
const app = express();
const usersRouter = require("./controllers/users");
const mongoose = require("mongoose");
const config = require("./utils/config");

mongoose.set("strictQuery", false);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("an error occured", error.message);
  })

app.use(express.json());
app.use("/api/users", usersRouter);

module.exports = app;