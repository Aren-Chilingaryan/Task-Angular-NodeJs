const express = require("express");
const app = express();
const cors = require("cors");
const accountsDb = require("./db/accounts");
app.use(cors());

const accounts = [
  {
    id: "1",
    name: "Vsem",
    creationDate: "05.12.21",
    owner: "Vanik",
    action: "view",
  },
  {
    id: "2",
    name: "Vaxarshak",
    creationDate: "12.11.20",
    owner: "Jonik",
    action: "view",
  },
  {
    id: "3",
    name: "Vitalik",
    creationDate: "15.08.19",
    owner: "Vruyr",
    action: "view",
  },
];


 app.get("/api/accounts", async (req, res) => {
 const acc = await accountsDb.getAccount();
  res.send(acc);
});


app.get("/api/accounts/:id", async (req, res) => {
  const singleAcc = await accountsDb.getSingleAccount(req.params.id)
  res.send(singleAcc);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
