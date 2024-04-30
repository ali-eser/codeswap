const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Project, Follow } = require("../models");

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({ 
    include: [
      { 
        model: Project, 
        attributes: ["title"] 
      }
    ]});
  return res.json(users);
});

usersRouter.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } });

    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).send("Error fetching user");
  }
});

usersRouter.post("/", async (req, res) => {
  const { username, name, email, password } = req.body;

  const isAlreadyUser = await User.findOne({ where: { username: username } });
  if (!(username && password && email && name)) {
    return res.status(401).send("Missing credentials");
  } else if (isAlreadyUser) {
    return res.status(401).send(`Username (${isAlreadyUser.username}) already taken!`);
  } else if (username.length < 3 || password.length < 8) {
    return res.status(401).send(
      "Username and password should be at least 3 and 8 characters long, respectively"
      );
  } else {
    const saltRounds = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    try {
      const savedUser = await User.create({
        username,
        name,
        email,
        passwordHash
      });
      return res.status(201).json(savedUser);
    } catch (err) {
      return res.status(400).json({ err });
    }
  }
});

usersRouter.put("/:followerId/follow/:followeeId", async (req, res) => {
  const { followerId, followeeId } = req.params;
  console.log(followerId, followeeId);
  try {
    const existingFollow = await Follow.findOne({
      where: {
        followerId: followerId,
        followeeId: followeeId
      }
    });

    if (existingFollow) {
      console.log(existingFollow);
      await existingFollow.destroy();
      return res.status(200).send("Unfollowed");
    } else {
      await Follow.create({
        followerId: followerId,
        followeeId: followeeId
      });
      return res.status(200).send("Followed");
    }
  } catch (err) {
    return res.status(500).json({ error: err })
  }
});

// route for checking whether or not the current user is already following the target user
usersRouter.get("/follow/:id", async (req, res) => {
  try {
    const alreadyFollowing = await Follow.findOne({ where: { followerId: req.params.id } });
    if (alreadyFollowing) {
      return res.status(200).send("Unfollow");
    } else {
      return res.status(200).send("Follow");
    }
  } catch (err) {
    return res.status(500).json({ message: "An error occurred", error: err });
  }
});

// route for getting a user's followings list as an array
usersRouter.get("/getFollowings/:id", async (req, res) => {
  try {
    const followedUserIds = await Follow.findAll({ where: { followerId: Number(req.params.id) } });
    if (followedUserIds) {
      const followingsArray = [];
      for (let i = 0; i < followedUserIds.length; i++) {
        followingsArray.push(followedUserIds[i].dataValues.followeeId);
      }
      console.log(followingsArray);
      return res.status(200).json(followingsArray);
    }
    return res.status(404).json({ message: "no following data found" });
  } catch (err) {
    return res.status(500).json({ message: "An error occured", error: err });
  }
});

// dev route for deleting all users
usersRouter.delete("/", async (req, res) => {
  await User.destroy({ where: {} });
  return res.status(204);
});

usersRouter.delete("/:id", async (req, res) => {
  const userToDelete = await User.findByPk(req.params.id);
  if (userToDelete) {
    await userToDelete.destroy();
    return res.status(204).send("user successfully deleted");
  }

  return res.status(404).send("user with specified id not found");
});

module.exports = usersRouter;