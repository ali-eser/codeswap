const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const projectsRouter = require("./controllers/projects");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(null, "img" + "_" + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, callback) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Allow files up to 10MB
});

app.use(cors());
app.use(express.json());
app.use(upload.any());
app.use("/uploads", express.static("uploads"));
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/projects", projectsRouter);

module.exports = app;