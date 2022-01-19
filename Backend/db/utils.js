const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const accountsDb = require("./accounts");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function generateAccessToken(user, secret, options = {}) {
  return jwt.sign(user, secret, options);
}

async function decodeJwtToken(token, secret) {
  return jwt.verify(token, secret);
}

async function getCurrentUser(req) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  const user = await decodeJwtToken(token, process.env.TOKEN_SECRET);
  return accountsDb.getUser(user.email);
}

module.exports = {
  hashPassword,
  generateAccessToken,
  decodeJwtToken,
  getCurrentUser,
};
