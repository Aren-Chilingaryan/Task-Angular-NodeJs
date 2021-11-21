const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const accounts = [
  {
    id: '1',
    name: 'Vsem',
    creationDate: '05.12.21',
    owner: 'Vanik',
    action:'view'
  },

  {
    id: '2',
    name: 'Vaxarshak',
    creationDate: '12.11.20',
    owner: 'Jonik',
    action:'view'
  },

  {
    id: '3',
    name: 'Vitalik',
    creationDate: '15.08.19',
    owner: 'Vruyr',
    action:'view'
  }
]


function giveSingleAccount(id){
  const account = accounts.find(oneAccount => oneAccount.id == id);
  return account;
}

app.get('/api/accounts', (req, res) => {
    res.send(accounts); 
});

app.get('/api/accounts/:id', (req, res ) => {
  res.send(giveSingleAccount(req.params.id) );
})

const port = process.env.PORT  || 3000;
app.listen(port , () => console.log(`Listening on port ${port}...`));