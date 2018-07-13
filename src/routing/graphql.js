import { ApolloServer, gql } from 'apollo-server-hapi'
import { merge } from 'lodash'

import * as sandbox from '../services/sandbox'

export const register = async (server) => {
  // setup of Apollo & GraphQL
  const apolloServer = new ApolloServer({
    path: '/graphql',
    typeDefs: [
      sandbox.typeDefs,
      gql`
        type ServiceStatus {
          status: String!
        }
        type Query {
          svcStatus: ServiceStatus
          ${sandbox.queries}
        }
      `
    ],
    resolvers: merge(
      {
        Query: {
          svcStatus: () => ({status: 'ok'})
        }
      },
      sandbox.resolvers,
    ),
    route: {
      cors: true,
    },
    context: (obj) => obj
  })
  await apolloServer.applyMiddleware({
    app: server,
  });
  await apolloServer.installSubscriptionHandlers(server.listener);
}
