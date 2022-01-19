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
  try {
    const accounts = await accountsDb.getAllAccounts();
    const currentUser = await utils.getCurrentUser(req);
    if (!currentUser) {
      return res.status(401).json({ error: "Access denied! Unauthorized" });
    }
    res.send(accounts);
  } catch (err) {
    return res.status(401).json({ error: "Access denied! " });
  }
});

router.get("/accounts/:id", async (req, res) => {
  try {
    const user = await utils.getCurrentUser(req);
    if (!user) {
      res.status(401).json({ error: "Token is invalid" });
      return;
    }
    const account = await accountsDb.getAccount(req.params.id);
    res.json(account);
  } catch (err) {
    res.status(401).json({ error: "Token is invalid" });
  }
});

router.post("/accounts", urlencodedParser, async (req, res) => {
  try {
    const user = await utils.getCurrentUser(req);
    if (!user) {
      res.status(401).json({ error: "Token is invalid" });
      return;
    }
    const { name, creationDate, owner } = req.body;
    const account = {
      name: name,
      date: creationDate,
      owner: owner,
    };
    const addedAccount = await accountsDb.addAccount(account);
    res.json(addedAccount);
  } catch (err) {
    res.status(401).json({ error: "Token is invalid" });
  }
});

router.post("/auth/signup", urlencodedParser, async (req, res) => {
  try {
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
    const tokenPayload = underscore.pick(user, [
      "id",
      "email",
      "firstName",
      "lastName",
      "age",
    ]);
    const token = await utils.generateAccessToken(
      tokenPayload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    const refreshToken = await utils.generateAccessToken(
      tokenPayload,
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
  } catch (err) {
    return res.status(401).json({ error: "Authentication failed!" });
  }
});

router.post("/refresh-jwt", urlencodedParser, async (req, res) => {
  try {
    const { refreshtoken } = req.body;
    if (!refreshtoken) {
      return res.status(401).json({ error: "Access denied,token missing!" });
    }
    const decodedData = await utils.decodeJwtToken(
      refreshtoken,
      process.env.REFRESH_SECRET
    );
    if (!decodedData) {
      return res
        .status(401)
        .json({ error: "Access denied,token is not valid!" });
    }
    const userEmail = decodedData.email;
    const user = await accountsDb.getUser(userEmail);

    const newTokenPayload = underscore.pick(user, [
      "id",
      "email",
      "firstName",
      "lastName",
      "age",
    ]);

    const newAccessToken = await utils.generateAccessToken(
      newTokenPayload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    const newRefreshToken = await utils.generateAccessToken(
      newTokenPayload,
      process.env.REFRESH_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN_REFRESH,
      }
    );

    res.json({
      access_token: newAccessToken,
      token_type: "Bearer",
      expires_in: process.env.EXPIRES_IN,
      refresh_token: newRefreshToken,
      scope: "create",
    });
  } catch (err) {
    res.status(401).json({ error: "Token is invalid" });
  }
});

router.post("/currentuser", urlencodedParser, async (req, res) => {
  const user = await utils.getCurrentUser(req);
  if (!user) {
    res.status(401).json({ error: "Token is invalid" });
    return;
  }
  res.status(200).json(user);
});

router.post("/auth/signin", urlencodedParser, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await accountsDb.getUser(email);
    if (!user) {
      res.status(401).json({ error: "User does not exist" });
      return;
    }
    const tokenPayload = underscore.pick(user, [
      "id",
      "email",
      "firstName",
      "lastName",
      "age",
    ]);
    const token = await utils.generateAccessToken(
      tokenPayload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    const refreshToken = await utils.generateAccessToken(
      tokenPayload,
      process.env.REFRESH_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN_REFRESH,
      }
    );

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Password is invalid" });
      return;
    }
    res.json({
      access_token: token,
      token_type: "Bearer",
      expires_in: process.env.EXPIRES_IN,
      refresh_token: refreshToken,
      scope: "create",
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

router.delete("/accounts/delete/:id", urlencodedParser, async (req, res) => {
  try {
    const user = await utils.getCurrentUser(req);
    if (!user) {
      res.status(401).json({ error: "Token is invalid" });
      return;
    }
    const id = req.params.id;
    const deltedAccount = await accountsDb.deleteAccount(id);
    res.send(deltedAccount);
  } catch (err) {
    res.status(401).json({ error: "Token is invalid" });
  }
});

app.use("/api", router);
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}/ ...`)
);
