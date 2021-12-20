const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

function getAllAccounts() {
  return new Promise((resolve, reject) => {
    const query_str = "SELECT * " + "FROM aren.accounts; ";
    connection.query(query_str, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getAccount(id) {
  return new Promise((resolve, reject) => {
    const query_str =
      "SELECT * " + "FROM aren.accounts " + "WHERE " + "id = " + id;
    connection.query(query_str, (err, rows) => {
      if (err) {
        return reject(err);
      }
      if (rows.length > 0) {
        resolve(rows[0]);
      } else {
        return null;
      }
    });
  });
}

function getCredentials() {
  return new Promise((resolve, reject) => {
    const query_str = "SELECT * " + "FROM aren.credentials;";
    connection.query(query_str, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getCorrectCredential(login, password) {
  return new Promise((resolve, reject) => {
    const query_str =
      "SELECT * " +
      "FROM aren.credentials" +
      " WHERE " +
      "password = " +
      password +
      " AND " +
      "login = " +
      "'" +
      login +
      "'";
    connection.query(query_str, (err, rows) => {
      if (err) {
        return reject(err);
      }
      if (rows.length > 0) {
        resolve(rows[0]);
      } else {
        return null;
      }
    });
  });
}

function addAccount(body) {
  return new Promise((resolve, reject) => {
    const query_str = `INSERT INTO aren.accounts (name, creationDate, owner) VALUES ("${body.name}", "${body.date}", "${body.owner}")`;
    connection.query(query_str, (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length > 0) {
        resolve(result[0]);
      } else {
        return null;
      }
    });
  });
}

function deleteAccount(id) {
  return new Promise((resolve, reject) => {
    const query_str = `DELETE FROM aren.accounts WHERE id = ${id};`;
    connection.query(query_str, (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length > 0) {
        resolve(result[0]);
      } else {
        return null;
      }
    });
  });
}

module.exports = {
  getAllAccounts,
  getAccount,
  getCredentials,
  getCorrectCredential,
  addAccount,
  deleteAccount,
};
