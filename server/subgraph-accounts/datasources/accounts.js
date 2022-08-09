let { accounts } = require('./accounts.json');
const fs = require('fs');

/*

const readFIle = path => {
  fs.readFile(__dirname + path, "utf8", (err, data) => {
    if (err) {
      console.log(err.stack);
      return;
    }
    console.log(data.toString());
  });
  console.log("Program Ended");
};
console.log(readFIle('/accounts.json'))*/
class AccountSource {
  getAccounts() {
    return accounts;
  }
  getAccount(accountId) {
    const accountsFile = fs.readFileSync(__dirname + '/accounts.json', {encoding:'utf-8'})
   // console.log(accountsFile);
    const parsedFile = JSON.parse(accountsFile);
   /* let foundUser = null;
    for (let key in parsedFile) {
      if (parsedFile[key].id === 1) {
        foundUser = parsedFile[key];
        break;
        }
    }
    console.log(foundUser);*/
    const findAccount = (parsedFile.accounts.find(i => i.id == accountId))
    //console.log(accountId);
    return findAccount;
  }
}

module.exports = AccountSource;