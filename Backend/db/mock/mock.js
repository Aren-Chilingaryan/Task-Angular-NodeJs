const accounts = require("./mock-accounts.json");
const users = require("./mock-users.json");

function getAccount(id) {
  const account = accounts.find((oneAccount) => oneAccount.id == id);
  return new Promise((resolve, reject) => {
    if (account) {
      resolve(account);
    } else {
      reject(null);
    }
  });
}

function getAllAccounts() {
  return new Promise((resolve, reject) => {
    if (accounts) {
      resolve(accounts);
    } else {
      reject([]);
    }
  });
}

function addAccount(object) {
  return new Promise((resolve, reject) => {
    const id = Number(accounts[accounts.length - 1].id) + 1;
    const { name, creationDate, owner } = object;
    const account = {
      id: id,
      name: name,
      date: creationDate,
      owner: owner,
    };
    accounts.push(account);
    if (account) {
      resolve(account);
    } else {
      reject(null);
    }
  });
}

function deleteAccount(id) {
  return new Promise((resolve, reject) => {
    accounts.filter((account) => account.id != id);
    if (accounts) {
      return resolve(accounts);
    } else {
      return reject([]);
    }
  });
}

function addUser(body) {
  return new Promise((resolve, reject) => {
    const { email, firstName, lastName, age, password } = body;
    const user = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      age: age,
      password: password,
    };
    users.push(user);
    if (user) {
      return resolve(user);
    }
    return reject(null);
  });
}

function getUser(email) {
  return new Promise((resolve, reject) => {
    const correctUser = users.find((user) => user.email == email);
    if (correctUser) {
      return resolve(correctUser);
    }
    return reject(null);
  });
}

module.exports = {
  getAccount,
  getAllAccounts,
  addAccount,
  deleteAccount,
  addUser,
  getUser,
};
