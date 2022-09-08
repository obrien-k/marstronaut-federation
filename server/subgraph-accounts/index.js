const {ApolloServer, gql, AuthenticationError} = require('apollo-server');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync(__dirname + '/accounts.graphql', {encoding: 'utf-8'}));
const resolvers = require(__dirname + '/resolvers');
const AccountSource = require(__dirname + '/datasources/accounts');

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => {
    return {
      AccountSource: new AccountSource()
    };
  },
  context: async ({req}) => {
    const id = req.headers.userid || ''; // e.g., "Bearer user-1"
    // Get the user token after "Bearer "
    //const id = token.split(' ')[1]; // e.g., "user-1"
    if (id) { // clean this up, assign userId to a var and start using real data
      return {user: {userId: id, userRole:req.headers.userrole}}
    }
    if (!id) throw new AuthenticationError('You must be logged in');
  }
});

const port = 4003;
const subgraphName = 'accounts';

server
  .listen({ port: process.env.PORT || port })
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });