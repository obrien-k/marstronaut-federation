require('dotenv').config()
const { ApolloServer } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } = require('@apollo/gateway');

/*
 * Subgraphs are introspected and composed at startup — no rover CLI or
 * pre-composed supergraph.graphql required.  Set the *_SUBGRAPH_URL env
 * vars to point at remote instances for production.
 */
const subgraphs = [
  { name: 'accounts', url: process.env.ACCOUNTS_SUBGRAPH_URL || 'http://localhost:4003' },
  { name: 'nasa',     url: process.env.NASA_SUBGRAPH_URL     || 'http://localhost:4001' },
  { name: 'xkcd',    url: process.env.XKCD_SUBGRAPH_URL     || 'http://localhost:4002' },
];

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set('userId',   context.user.userId);
    request.http.headers.set('userRole', context.user.userRole);
    request.http.headers.set('apollo-federation-include-trace', 'ftv1');
    request.http.headers.set('Access-Control-Expose-Headers', '*');
  }
}

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({ subgraphs }),
  buildService({ url }) {
    return new AuthenticatedDataSource({ url });
  }
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const id = token.split(' ')[1];
    if (id) {
      return { user: { userId: id, userRole: 'test' } };
    }
    return { user: { userId: '0', userRole: 'Guest' } };
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => { console.error(err); });
