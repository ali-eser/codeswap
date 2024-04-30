const projectsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { User, Project, Like } = require("../models");

// strip token from "Bearer" keyword
const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
};

// fetch all projects
projectsRouter.get("/", async (req, res) => {
  const projects = await Project.findAll({ include: [{ model: User, attributes: ["username"] }] });
  return res.status(200).json(projects);
});

// fetch a single project
projectsRouter.get("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, { include: [{ model: User, attributes: ["username"] }] });
    if (project) {
      return res.status(200).json(project);
    } else if (!project) {
      return res.status(404).send(`No project with ID (${req.params.id}) found`);
    }
  } catch (err) {
    if (err.name === "SequelizeDatabaseError") {
      return res.status(401).send(`Invalid ID format. ID must be a number. [${err.name}]`);
    }
    return res.status(401).send(err.name);
  }
});

// endpoint for posting a new project
projectsRouter.post("/", async (req, res) => {
  const body = req.body;

  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    if (!Object.hasOwn(body, "title") || !Object.hasOwn(body, "description")) {
      return res.status(400).send("Missing project title or description");
    }

    if (body.title.length < 3 || body.description.length < 20) {
      return res.status(401).send(
        "Title and description should be at least 3 and 20 characters long respectively"
        );
    }

    // if req.files is empty, image path will be an empty string
    let pathToImage = "";
    if (req.files.length != 0) {
      req.files
      pathToImage = req.files[0].path;
    } 

    const user = await User.findByPk(decodedToken.id)
    const project = await Project.create({
      title: body.title,
      description: body.description,
      likes: 0,
      imagePath: pathToImage,
      userId: user.id
    });

    return res.status(200).json(project);

  } catch (err) {
    return res.status(401).json({ error: err });
  }
});

// endpoint for likes
projectsRouter.put("/:id", async (req, res) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    let project = await Project.findByPk(Number(req.params.id));
    let user = await User.findByPk(Number(decodedToken.id));

    let like = await Like.findOne({ where: {userId: user.id, projectId: req.params.id} });
    console.log("likes: ", like);

    if (like) {
      await like.destroy()
      await project.decrement("likes");
      return res.status(200).json({ likes: project.likes });
    } else {
      await project.increment("likes");
      await Like.create({ userId: user.id, projectId: req.params.id });
      return res.status(200).json({ likes: project.likes });
    }

  } catch (err) {
    return res.status(401).json({ error: err });
  }
});

// dev route for deleting all projects
projectsRouter.delete("/", async (req, res) => {
  await Project.destroy({ where: {} });
  return res.status(204);
});

projectsRouter.delete("/:id", async (req, res) => {
  const projectToDelete = await Project.findByPk(req.params.id);
  await projectToDelete.destroy();
  return res.status(204);
});

module.exports = projectsRouter;