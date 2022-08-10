const {ApolloServer, gql} = require('apollo-server');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync(__dirname + '/xkcd.graphql', {encoding: 'utf-8'}));
const resolvers = require(__dirname + '/resolvers');
const XkcdAPI = require(__dirname + '/datasources/XkcdApi');
const TotallySource = require(__dirname + '/datasources/totally');

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => {
    return {
      xkcdAPI: new XkcdAPI(),
      totallySource: new TotallySource()
    };
  }
});

const port = 4002;
const subgraphName = 'xkcd';

server
  .listen({ port: process.env.PORT || port })
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });