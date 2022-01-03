const accounts = require("./mock-accounts.json");
const users = require("./mock-users.json");
const bcrypt = require("bcrypt");

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
    const user = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      age: body.age,
      password: body.password,
    };
    users.push(user);
    if (user) {
      return resolve(user);
    }
    return reject(null);
  });
}

function getUser(email) {
  console.log(users);
  return new Promise((resolve, reject) => {
    const correctUser = users.find((user) => user.email == email);
    if (correctUser) {
      return resolve(correctUser);
    }
    return reject(null);
  });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

module.exports = {
  getAccount,
  getAllAccounts,
  addAccount,
  deleteAccount,
  addUser,
  getUser,
  hashPassword,
};
