const accounts = require("./mock.json");

function getAccount(id) {
  const account = accounts.find((oneAccount) => oneAccount.id == id);
  return new Promise((resolve, reject) => {
    if (account) {
      resolve(account);
    } else {
      reject("No account");
    }
  });
}

function getAllAccounts() {
  return new Promise((resolve, reject) => {
    if (accounts) {
      resolve(accounts);
    } else {
      reject("No data");
    }
  });
}

function addAccount(id, name, date, owner) {
  accounts.push({ id, name, date, owner });
}

function deleteAccount(id) {
  accounts.filter((account) => account.id == id);
}

module.exports = {
  getAccount,
  getAllAccounts,
  addAccount,
  deleteAccount,
};
