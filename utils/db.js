const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
  host: "localhost",
  dialect: "postgres"
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the database")
  } catch (err) {
    console.log("Failed to connect to the database. Error: ", err.message)
    return process.exit(1)
  }
  return null
}

module.exports = { connectToDatabase, sequelize };