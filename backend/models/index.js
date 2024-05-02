const User = require("./user");
const Project = require("./project");
const Like = require("./like");
const Follow = require("./follow");
const Comment = require("./comment");

User.hasMany(Project, { onDelete: "CASCADE" });
Project.belongsTo(User);

User.belongsToMany(Project, { through: Like, as: "LikedProjects" });
Project.belongsToMany(User, { through: Like, as: "LikedByUsers", onDelete: "CASCADE" });

Project.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(Project);

User.sync({ alter: true });
Project.sync({ alter: true });
Like.sync({ alter: true });
Follow.sync({ alter: true });
Comment.sync({ alter: true });

module.exports = {
  User, Project, Like, Follow, Comment
};