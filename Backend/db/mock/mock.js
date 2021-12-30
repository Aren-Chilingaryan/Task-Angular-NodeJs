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
      reject(null);
    }
  });
}

function deleteAccount(id) {
  return new Promise((resolve, reject) => {
    accounts = accounts.filter((account) => account.id != id);
    if (accounts) {
      return resolve(accounts);
    } else {
      return reject([]);
    }
  });
}

function addUser(body) {
  return new Promise((resolve, reject) => {
    const user = {
      id: body.id,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      age: body.age,
      password: body.password,
    };
    users = users.push(user);
    if (user) {
      return resolve(user);
    }
    return reject(null);
  });
}

function getUser(email) {
  return new Promise((resolve, reject) => {
    const correctUser = users.find(
      (user) => user.email == email
    );
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
