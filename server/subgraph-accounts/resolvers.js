const { AuthenticationError } = require("apollo-server");

const resolvers = {
  Mutation: {
    addAccount: async (_, { id, role }, { dataSources }) => {
      const newAccount = await dataSources.AccountSource.addAccount(id, role);
      console.log(newAccount);
      return {
        code: 200,
        success: true,
        message: 'Success', 
        Account: newAccount}
    }
  },
  Query: {
    // returns account A&A
    Account: async (parent, { id }, context, info) => {
     console.log(context.user);
     console.log(parent);
     /* if(!context.user) throw new AuthenticationError("authErrMessage");
      if(context.userId == '141592') {
        console.log("yay");
      }
      else {
        console.log("noo");
      }
      console.log(userId); */
      return context.dataSources.AccountSource.getAccount(id);
      
    },
    Accounts: async (_, __, {dataSources}) => {
      return dataSources.AccountSource.getAccounts();
    },
  },
  Account: {
    __resolveReference: (reference, {dataSources}) => {
      console.log("[subgraph-accounts][Account] reference" + JSON.stringify(reference))
      return reference.id;
    },
    orders: (parent) => {
      console.log("[subggraph-accounts][Account] orders" +JSON.stringify(parent));
      console.log({account_id: parent.id});
      return {account_id: parent.id}
    },
    // @requires from order
    sales_total: (reference) => {
      console.log("[subgraph-accounts][Order][sales_total] reference" + JSON.stringify(reference))
      return (reference.total);
    }
  },
 /* Orders: {
    __resolveReference: (reference, {dataSources}) => {
      console.log("[subgraph-accounts][Order] reference" + JSON.stringify(reference))
      return {account_id: reference.account_id};
    },
    Account: (root) => {
      console.log("[subgraph-accounts][Order][Account] parent" + JSON.stringify(root))
    },

  }*/
};

module.exports = resolvers;