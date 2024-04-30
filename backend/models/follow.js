const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class Follow extends Model {};

Follow.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  followeeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: "follow"
});

module.exports = Follow;