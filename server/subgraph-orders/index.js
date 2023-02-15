const {ApolloServer, gql, AuthenticationError} = require('apollo-server');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync(__dirname + '/orders.graphql', {encoding: 'utf-8'}));
const resolvers = require(__dirname + '/resolvers');
const OrderSource = require(__dirname + '/datasources/orders');

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => {
    return {
      OrderSource: new OrderSource()
    };
  },
});

const port = 4004;
const subgraphName = 'orders';

server
  .listen({ port: process.env.PORT || port })
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });