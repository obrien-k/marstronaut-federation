const { orders } = require(__dirname + '/orders.json');
const fs = require('fs');

class OrderSource {
  getOrders() {
    return orders;
  }
  getOrder(orderId) {
    const ordersFile = fs.readFileSync(__dirname + '/orders.json', {encoding:'utf-8'})
    const parsedFile = JSON.parse(ordersFile);
    const findOrder = (parsedFile.Orders.find(i => i.id == orderId))
    return findOrder;
  }

  getAccountOrders(accountId) {
    console.log(accountId);
    const ordersFile = fs.readFileSync(__dirname + '/orders.json', {encoding:'utf-8'})
    const parsedFile = JSON.parse(ordersFile);
    const findOrder = (parsedFile.Orders.find(i => i.account_id == accountId))
    console.log(findOrder);
    return findOrder;
  }
}

module.exports = OrderSource;