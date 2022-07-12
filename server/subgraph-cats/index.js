const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');
const {readFileSync} = require('fs');
const {buildSubgraphSchema} = require('@apollo/subgraph');

const typeDefs = gql(readFileSync('./cats.graphql', {encoding: 'utf-8'}));



const server = new ApolloServer({
    schema: buildSubgraphSchema({typeDefs, resolvers}),
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    }
  });
  const port = 4003;
  const subgraphName = 'cats';
  
  server
    .listen({port})
    .then(({url}) => {
      console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
    })
    .catch(err => {
      console.error(err);
    });
