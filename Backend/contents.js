require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());
app.use(bodyParser.json());
let filePath = "./db/accounts";

if(process.env.IS_MOCK == "true") {
    filePath = "./db/mock";
} else{
    filePath = "./db/accounts";
}

const accountsDb = require(filePath);

app.get("/api/accounts", async (req, res) => {
    const acc = await accountsDb.getAccount();
    res.send(acc);
    console.log(res);
});

app.get("/api/accounts/:id", async (req, res) => {
    const singleAcc = await accountsDb.getSingleAccount(req.params.id);
    res.send(singleAcc);
});

app.post("/api/accounts", urlencodedParser, (req, res) => {
    const body = {
        name: req.body.name,
        date: req.body.creationDate,
        owner: req.body.owner
    }
    accountsDb.addAccount(body.name, body.date, body.owner);
});

const port = process.env.PORT;
app.listen(port, () =>
    console.log(`Listening at http://localhost:${port}/ ...`)
);