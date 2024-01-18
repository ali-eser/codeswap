const Sequelize = require("sequelize");
const {
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PORT
} = require("./config");

const sequelize = new Sequelize(
  `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`, {
  dialect: "postgres",
  logging: false
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (err) {
    console.log("Failed to connect to the database. Error: ", err.message);
    return process.exit(1);
  }
  return null;
}

module.exports = { connectToDatabase, sequelize };