const { accounts } = require(__dirname + '/accounts.json');
const fs = require('fs');

class AccountSource {
  getAccounts() {
    return accounts;
  }
  getAccount(accountId) {
    const accountsFile = fs.readFileSync(__dirname + '/accounts.json', {encoding:'utf-8'})
    const parsedFile = JSON.parse(accountsFile);
    const findAccount = (parsedFile.accounts.find(i => i.id == accountId))
    return findAccount;
  }
  addAccount(accountId, role) {
    const fileMod = accounts;
    console.log(accountId,role)
    fileMod.push({"id": accountId, "role": role})

    fs.writeFile(__dirname + '/accounts.json','{\n  "accounts":\n' + JSON.stringify(fileMod, null, 2) + '\n}', function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(fileMod));
      console.log('writing to accounts.json');
    })
     // Can this be made more DRY? See lines 10-14 / getAccount
    const accountsFile = fs.readFileSync(__dirname + '/accounts.json', {encoding:'utf-8'})
    const parsedFile = JSON.parse(accountsFile);
    const findAccount = (parsedFile.accounts.find(i => i.id == accountId))
    return findAccount;
  }
}

module.exports = AccountSource;