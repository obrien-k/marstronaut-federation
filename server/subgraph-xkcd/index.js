const {ApolloServer, gql} = require('apollo-server');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync('./xkcd.graphql', {encoding: 'utf-8'}));
const resolvers = require('./resolvers');
const XkcdAPI = require('./datasources/XkcdApi');
const TotallySource = require('./datasources/totally');

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
  .listen({port})
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });