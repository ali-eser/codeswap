const User = require("./user");
const Project = require("./project");

User.hasMany(Project);
Project.belongsTo(User);

User.sync({ alter: true });
Project.sync({ alter: true });

module.exports = {
  User, Project
};