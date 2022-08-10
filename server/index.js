require('dotenv').config()
const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { readFileSync } = require('fs');

const supergraphSdl = readFileSync(__dirname + '/supergraph.graphql').toString();

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
  // Subscriptions are not currently supported in Apollo Federation
  subscriptions: false,
  context: async ({req}) => {
    const token = req.headers.authorization || ''; // e.g., "Bearer user-1"
    // Get the user token after "Bearer "
    const id = token.split(' ')[1]; // e.g., "user-1"
    if (id) { // clean this up, assign userId to a var and start using real data
      return {user: {userId: id, userRole:"test"}}
    }
    if (!id) { // guest account for not logged in
      return {user: {userId: "0", userRole: "Guest"}}
    }
  }
});



server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => {console.error(err)});