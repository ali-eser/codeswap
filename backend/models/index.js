const User = require("./user");
const Project = require("./project");
const Follower = require("./follower");
const Following = require("./following");

User.hasMany(Project, { onDelete: 'CASCADE' });
Project.belongsTo(User);

User.sync({ alter: true });
Project.sync({ alter: true });

module.exports = {
  User, Project
};