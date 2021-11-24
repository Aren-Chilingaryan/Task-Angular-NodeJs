require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const accountsDb = require("./db/accounts");
app.use(cors());
let toBoolean = require("to-boolean");

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

app.get(process.env.getAccounts, async (req, res) => {
  if (toBoolean(process.env.dataFromDb)) {
    const acc = await accountsDb.getAccount();
    res.send(acc);
  } else {
    res.send(accounts);
  }
});

app.get(process.env.getOneAccount, async (req, res) => {
  if (toBoolean(process.env.dataFromDb)) {
    const singleAcc = await accountsDb.getSingleAccount(req.params.id);
    res.send(singleAcc);
  } else {
    res.send(giveSingleAccount(req.params.id));
  }
});

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}/ ...`)
);
