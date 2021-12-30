require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());
app.use(bodyParser.json());
const db = require("./db/database");
const accountsDb = db.accounts;

app.get("/api/accounts", async (req, res) => {
  const accounts = await accountsDb.getAllAccounts();
  res.send(accounts);
});

app.get("/api/accounts/:id", async (req, res) => {
  const account = await accountsDb.getAccount(req.params.id);
  res.send(account);
});

app.post("/api/accounts", urlencodedParser, async (req, res) => {
  const body = {
    name: req.body.name,
    date: req.body.creationDate,
    owner: req.body.owner,
  };
  const addedAccount = await accountsDb.addAccount(body);
  res.send(addedAccount);
});

app.post("/api/users", urlencodedParser, async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const heshedPassword = await bcrypt.hash(req.body.password, salt);
  const body = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    password: heshedPassword,
  };
  const addedUser = await accountsDb.addUser(body);
  res.send(addedUser);
});

app.post("/api/users/authorized", urlencodedParser, async (req, res) => {
  const { email, password } = req.body;
  const user = await accountsDb.getUser(email);
  if (!user) {
    res.status(401).json({ error: "User does not exist" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Password is invalid" });
    return;
  }
  res.status(200).json(user);
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
