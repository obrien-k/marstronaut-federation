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
    Issue: async (parent, {id}, context, info) => {
      return context.dataSources.AccountSource.getIssues();
    }
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

  },
  Order: {
    account_total_sales: (parent) => {
      console.log(JSON.stringify(parent))
      return (parent.total);
    },
  }
};

module.exports = resolvers;