require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());
app.use(bodyParser.json());
const accountsDb = require("./db/database");
  
app.get("/api/accounts", async (req, res) => {
    const acc = await accountsDb.accounts.getAccount();
    res.send(acc);
});

app.get("/api/accounts/:id", async (req, res) => {
    const singleAcc = await accountsDb.accounts.getSingleAccount(req.params.id);
    res.send(singleAcc);
});

app.post("/api/accounts", urlencodedParser, (req, res) => {
    const body = {
        name: req.body.name,
        date: req.body.creationDate,
        owner: req.body.owner
    }
    accountsDb.accounts.addAccount(body.name, body.date, body.owner);
});

app.delete("/api/accounts/delete/:id", urlencodedParser, (req, res) => {
    const id = req.params.id 
    accountsDb.accounts.deleteAccount(id);
    res.redirect('/api/accounts');
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Listening at http://localhost:${port}/ ...`)
);