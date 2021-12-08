require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const accountsDb = require("./db/accounts");
app.use(cors());

const accounts = [
  {
    id: "1",
    name: "argam",
    creationDate: "05.12.21",
    owner: "argam",
    action: "view",
  },
  {
    id: "2",
    name: "argam",
    creationDate: "12.11.20",
    owner: "argam",
    action: "view",
  },
  {
    id: "3",
    name: "argam",
    creationDate: "12.12.20",
    owner: "argam",
    action: "view",
  },
];

function giveSingleAccount(id) {
  const account = accounts.find((oneAccount) => oneAccount.id == id);
  return account;
}
// function findPassword(password) {
//   const credential = credentials.find((credential) => credential.password == password);
//   return account;
// }

app.get("/api/accounts", async (req, res) => {
  if (process.env.IS_MOCK == true) {
    res.send(accounts);
    console.log("ari moment");
  } else {
    const acc = await accountsDb.getAccount();
    res.send(acc);
  }
});

app.get("/api/accounts/:id", async (req, res) => {
  if (process.env.IS_MOCK == true) {
    res.send(giveSingleAccount(req.params.id));
  } else {
    const singleAcc = await accountsDb.getSingleAccount(req.params.id);
    res.send(singleAcc);
  }
});

app.get("/api/credentials", async (req, res) => {
  const credentials = await accountsDb.getCredentials();
  res.send(credentials);
});

app.get("/api/credentials/:login/:password", async (req, res) => {
  const correctCred = await accountsDb.getCorrectCredential(
    req.params.login,
    req.params.password
  );
  res.send(correctCred);
});

const port = process.env.PORT;
app.listen(3001, () =>
  console.log(`Listening at http://localhost:${port}/ ...`)
);
