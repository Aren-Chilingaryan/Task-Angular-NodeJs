require("dotenv").config();

let accounts = require("./accounts");

if (process.env.IS_MOCK == "true") {
  accounts = require("./mock/mock");
}

module.exports = {
  accounts,
};
