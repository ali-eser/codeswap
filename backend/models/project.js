const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Project extends Model {};

Project.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: "project"
});

module.exports = Project;