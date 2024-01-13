const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username: username});

  const isCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && isCorrect)) {
    return res.status(401).send("Invalid username or password");
  }

  const userForToken = {
    username: user.username,
    id: user.id
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;