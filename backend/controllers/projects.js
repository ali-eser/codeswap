const projectsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { User, Project } = require("../models");

const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }
};

projectsRouter.get("/", async (req, res) => {
  const projects = await Project.findAll();
  return res.status(200).json(projects);
});

projectsRouter.post("/", async (req, res) => {
  const body = req.body;

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "tokaen invalid" });
    }

    if (!Object.hasOwn(body, "title") || !Object.hasOwn(body, "description")) {
      return res.status(400).send("Missing project title or description");
    }

    if (body.title.length < 3 || body.description.length < 20) {
      return res.status(400).send(
        "Title and description should be at least 3 and 20 characters long respectively"
        );
    }

    const user = await User.findByPk(decodedToken.id)
    const project = await Project.create({
      title: body.title,
      description: body.description,
      likes: 0,
      userId: user.id
    });

    return res.status(200).json(project);

  } catch (err) {
    return res.status(401).json({ error: err });
  }
});

module.exports = projectsRouter;