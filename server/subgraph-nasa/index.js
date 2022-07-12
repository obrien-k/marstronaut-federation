const {ApolloServer, gql} = require('apollo-server');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync('./manifests.graphql', {encoding: 'utf-8'}));
const resolvers = require('./resolvers');
const NasaAPI = require('./datasources/NasaApi');

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => {
    return {
      nasaAPI: new NasaAPI()
    };
  }
});

const port = 4001;
const subgraphName = 'nasa';

server
  .listen({port})
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });