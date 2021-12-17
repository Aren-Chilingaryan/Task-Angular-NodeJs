require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const accountsDb = require("./db/accounts");
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors());
app.use(bodyParser.json());

const accounts = [{
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


app.get("/api/accounts", async (req, res) => {
    if (process.env.IS_MOCK == true) {
        res.send(accounts);
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

app.post("/api/accounts", urlencodedParser, (req, res) => {
    console.log(req.body);
    var id = req.body.id;
    var name = req.body.name;
    var date = req.body.creationDate;
    var owner = req.body.owner;
    accountsDb.addAccount(id,name,date,owner);
});

const port = process.env.PORT;
app.listen(3001, () =>
    console.log(`Listening at http://localhost:${port}/ ...`)
);
