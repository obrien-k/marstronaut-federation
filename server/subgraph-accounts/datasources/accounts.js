let { accounts } = require('./accounts.json');
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
}

module.exports = AccountSource;