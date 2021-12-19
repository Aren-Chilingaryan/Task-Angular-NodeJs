require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());
app.use(bodyParser.json());
const Db = require("./db/database");
const accountsDb = Db.accounts;

app.get("/api/accounts", async (req, res) => {
  const acc = await accountsDb.getAllAccounts();
  res.send(acc);
});

app.get("/api/accounts/:id", async (req, res) => {
  const singleAcc = await accountsDb.getAccount(req.params.id);
  res.send(singleAcc);
});

app.post("/api/accounts", urlencodedParser, async (req, res) => {
  const body = {
    name: req.body.name,
    date: req.body.creationDate,
    owner: req.body.owner,
  };
  const addedAccount = await accountsDb.addAccount(
    body.name,
    body.date,
    body.owner
  );
  res.send(addedAccount);
});

app.delete("/api/accounts/delete/:id", urlencodedParser, async (req, res) => {
  const id = req.params.id;
  const deltedAccount = await accountsDb.deleteAccount(id);
  res.send(deltedAccount);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}/ ...`)
);
