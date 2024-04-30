const User = require("./user");
const Project = require("./project");
const Like = require("./like");
const Follow = require("./follow");

User.hasMany(Project, { onDelete: "CASCADE" });
Project.belongsTo(User);

User.belongsToMany(Project, { through: Like, as: "LikedProjects" });
Project.belongsToMany(User, { through: Like, as: "LikedByUsers", onDelete: "CASCADE" });

//User.belongsToMany(User, { through: Follow, as: "Follower", onDelete: "CASCADE" });
//User.belongsToMany(User, { through: Follow, as: "Following", onDelete: "CASCADE" });

User.sync({ alter: true });
Project.sync({ alter: true });
Like.sync({ alter: true });
Follow.sync({ alter: true });

module.exports = {
  User, Project, Like, Follow
};