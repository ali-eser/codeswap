const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Like extends Model {};

Like.init({}, {
  sequelize,
  underscored: true,
  modelName: "like"
});

module.exports = Like;