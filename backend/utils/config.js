require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
  PORT,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_PASSWORD,
  DATABASE_USER
};