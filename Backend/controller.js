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
const router = express.Router();
const utils = require("./db/utils.js");
const underscore = require("underscore");

router.get("/accounts", async (req, res) => {
  const accounts = await accountsDb.getAllAccounts();
  res.send(accounts);
});

router.get("/accounts/:id", async (req, res) => {
  const account = await accountsDb.getAccount(req.params.id);
  res.send(account);
});

router.post("/accounts", urlencodedParser, async (req, res) => {
  const { name, creationDate, owner } = req.body;
  const account = {
    name: name,
    date: creationDate,
    owner: owner,
  };
  const addedAccount = await accountsDb.addAccount(account);
  res.send(addedAccount);
});

router.post("/auth/signup", urlencodedParser, async (req, res) => {
  const { email, firstName, lastName, age, password } = req.body;
  const hashedPassword = await utils.hashPassword(password);
  const user = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    age: age,
    password: hashedPassword,
  };
  const addedUser = await accountsDb.addUser(user);
  const newUserObject = underscore.pick(user, [
    "id",
    "email",
    "firstName",
    "lastName",
    "age",
  ]);
  const token = await utils.generateAccessToken(
    newUserObject,
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  const refreshToken = await utils.generateAccessToken(
    newUserObject,
    process.env.REFRESH_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN_REFRESH,
    }
  );
  res.json({
    access_token: token,
    token_type: "Bearer",
    expires_in: process.env.EXPIRES_IN,
    refresh_token: refreshToken,
    scope: "create",
  });
});

router.post("/refresh-jwt", urlencodedParser, async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).json({ error: "Access denied,token missing!" });
  }
  const decodedData = await utils.decodeJwtToken(
    refreshToken,
    process.env.REFRESH_SECRET
  );
  if (!decodedData) {
    return res.status(401).json({ error: "Access denied,token is not valid!" });
  }
  const userEmail = decodedData.email;
  const user = await accountsDb.getUser(userEmail);

  const userObject = underscore.pick(user, [
    "id",
    "email",
    "firstName",
    "lastName",
    "age",
  ]);

  const newToken = await utils.generateAccessToken(
    userObject,
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  res.json({
    access_token: newToken,
    token_type: "Bearer",
    expires_in: process.env.EXPIRES_IN,
    refresh_token: refreshToken,
    scope: "create",
  });
});

router.post("/auth/signin", urlencodedParser, async (req, res) => {
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

router.delete("/accounts/delete/:id", urlencodedParser, async (req, res) => {
  const id = req.params.id;
  const deltedAccount = await accountsDb.deleteAccount(id);
  res.send(deltedAccount);
});

app.use("/api", router);
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}/ ...`)
);
