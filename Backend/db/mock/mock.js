let accounts = require("./mock.json");

function getAccount(id) {
  let account = accounts.find((oneAccount) => oneAccount.id == id);
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

function addAccount(object) {
  return new Promise((resolve, reject) => {
    const id = Number(accounts[accounts.length - 1].id) + 1;
    const account = {
      id: id,
      name: object.name,
      date: object.creationDate,
      owner: object.owner,
    };
    accounts.push(account);
    if (account) {
      resolve(account);
    } else {
      reject("No data");
    }
  });
}

function deleteAccount(id) {
  return new Promise((resolve, reject) => {
    accounts = accounts.filter((account) => account.id != id);
    if (accounts) {
      resolve(accounts);
    } else {
      reject("No data");
    }
  });
}

module.exports = {
  getAccount,
  getAllAccounts,
  addAccount,
  deleteAccount,
};
