const resolvers = {
  Query: {
    Order: async (_, { id }, { dataSources }) => {  
      return dataSources.OrderSource.getOrder(id);
 
    },
    Orders: async (_, __, { dataSources }) => {
      return dataSources.OrderSource.getOrders();
    },
    AccountOrders: async (_, { id }, { dataSources }) => {
      return dataSources.OrderSource.getAccountOrders(id);
    }, 
  },
  Order: {
    __resolveReference: (reference, { dataSources }) => {
      console.log("[subgraph-orders][Order] reference " + JSON.stringify(reference))
      return {account_id: reference.id, total: reference.total}
    },
    total_sales: (parent) => {
      console.log(JSON.stringify(parent))
      console.log("total sales logged" + JSON.stringify(parent));
      return "total sales";
    },
    account: (parent) => {
      return (parent.account_id);
    }
  },
};

module.exports = resolvers;