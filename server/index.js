require('dotenv').config()
const { ApolloServer, AuthenticationError } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { readFileSync } = require('fs');
const supergraphSdl = readFileSync('./supergraph.graphql').toString();

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    // Pass the user's id from the context to each subgraph
    // as a header called `user-id`
    request.http.headers.set('userId', context.user.userId);
    request.http.headers.set('userRole', context.user.userRole);
  }
}

const gateway = new ApolloGateway({
  supergraphSdl,
  buildService({ name, url }) {
    return new AuthenticatedDataSource({ url });
  },
});


const server = new ApolloServer({
  gateway,
  subscriptions: false,
  cache:"bounded",
  context: async ({ req }) => {
    const token = req.headers.authorization || ''; // e.g., "Bearer user-1"
    // Get the user token after "Bearer "
    const id = token.split(' ')[1]; // e.g., "user-1"
    if (id) {
      return {user: {userId: id, userRole:"test"}}
    }
    if (!id) throw new AuthenticationError('You must be logged in');
    else {
      return {userId: "nonce"}
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => {console.error(err)});