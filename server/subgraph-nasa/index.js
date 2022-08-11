const {ApolloServer, gql} = require('apollo-server');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync(__dirname + '/nasa.graphql', {encoding: 'utf-8'}));
const resolvers = require(__dirname + '/resolvers');
const NasaAPI = require(__dirname + '/datasources/NasaApi');

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
  .listen({ port: process.env.PORT || 4001 })
  .then(({url}) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });