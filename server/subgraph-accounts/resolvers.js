const { AuthenticationError } = require("apollo-server");

const resolvers = {
  Query: {
    // returns account A&A
    account: async (_, {id}, context) => {
     console.log(context.user);
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
    accounts: async (_, __, {dataSources}) => {
      return dataSources.AccountSource.getAccounts();
    }
  },
  account: {
    __resolveReference: ({id}, {dataSources}) => {
      return dataSources.AccountSource.getAccount(id);
    }
  }

};

module.exports = resolvers;