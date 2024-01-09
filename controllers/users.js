const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, email, password } = req.body;

  const isAlreadyUser = await User.findOne({ username: username });
  if (!(username && password && email && name)) {
    return res.status(401).send("Missing credentials");
  } else if (isAlreadyUser) {
    return res.status(401).send("Username already taken!");
  } else if (username.length < 3 || password.length < 8) {
    return res.status(401).send(
      "Username and password should be at least 3 and 8 characters long, respectively"
      );
  } else {
    const saltRounds = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User ({
      username,
      name,
      email,
      passwordHash
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  }
});

// dev route to delete all users from database
usersRouter.delete("/", async (req, res) => {
  await User.deleteMany({});
  res.status(204);
})

module.exports = usersRouter;