const express = require('express');
const app = express();
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const projectsRouter = require("./controllers/projects");

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/projects", projectsRouter);

module.exports = app;