const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "aren",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = {
  getAccount,
  getSingleAccount,
  getCredentials,
  getCorrectCredential,
};

function getAccount() {
  return new Promise(function (resolve, reject) {
    var query_str = "SELECT * " + "FROM aren.account; ";
    connection.query(query_str, function (err, rows, fields) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getSingleAccount(id) {
  return new Promise(function (resolve, reject) {
    var query_str =
      "SELECT * " + "FROM aren.account " + "WHERE " + "id = " + id;
    connection.query(query_str, function (err, rows, fields) {
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
  return new Promise(function (resolve, reject) {
    var query_str = "SELECT * " + "FROM aren.credentials;";
    connection.query(query_str, function (err, rows, fields) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getCorrectCredential(login, password) {
  return new Promise(function (resolve, reject) {
    var query_str =
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
    connection.query(query_str, function (err, rows, fields) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}
