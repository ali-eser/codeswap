const commentsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { Comment, Project, User } = require("../models");

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
};

commentsRouter.post("/:projectId", async (req, res) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    const project = await Project.findByPk(req.params.projectId);
    if (!project) {
      return res.status(404).send(`Post with the specified ID (${req.params.projectId}) not found`);
    }

    const user = await User.findByPk(decodedToken.id);

    const comment = await Comment.create({
      text: req.body.text,
      projectId: req.params.projectId,
      username: user.username,
      userId: user.id
    });

    return res.status(201).json(comment);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = commentsRouter;