
const accounts = [{
        id: "1",
        name: "argam",
        creationDate: "05.12.21",
        owner: "argam",
    },
    {
        id: "2",
        name: "argam",
        creationDate: "12.11.20",
        owner: "argam",
    },
    {
        id: "3",
        name: "argam",
        creationDate: "12.12.20",
        owner: "argam",
    },
];

function getSingleAccount(id) {
    const account = accounts.find((oneAccount) => oneAccount.id == id);
    return new Promise((resolve, reject) => {
        if (err) {
            resolve(err);
        }else{
           reject("No account");
        }
    });
}

function getAccount() {
    return new Promise((resolve, reject) => {
        if (accounts) {
            resolve(accounts);
        }else{
            reject("No data");
        }
    });
}

function addAccount(id, name, date, owner) {
    accounts.push({id, name, date, owner });
}

module.exports = {
    getSingleAccount,
    getAccount,
    addAccount
};

