const { AuthenticationError } = require("apollo-server");

const resolvers = {
  Query: {
    // returns account A&A
    totally: async (_, __, context) => {
      console.log(context.userId);
      if(!context.user) throw new AuthenticationError("authErrMessage");
      if(context.userId == '141592') {
        console.log("yay");
      }
      else {
        console.log("noo");
      }
      console.log(userId);
      return context.dataSources.totallySource.getTotally();
 
    },
  },
  totally: {
    __resolveReference: ({id}, {dataSources}) => {
      return dataSources.totallySource.getTotally(id);
    }
  }

};

module.exports = resolvers;