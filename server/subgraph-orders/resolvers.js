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
    __resolveReference: async (reference, { dataSources }) => {
      console.log("[subgraph-orders][Order] reference " + JSON.stringify(reference))
      console.log((reference.account_id))
      return dataSources.OrderSource.getAccountOrders(reference.account_id);
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