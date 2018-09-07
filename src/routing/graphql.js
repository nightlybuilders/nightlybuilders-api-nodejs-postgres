import { ApolloServer, gql } from 'apollo-server-hapi'

import * as svcstatus from '../services/svcstatus'
import * as sandbox from '../services/sandbox'

const services = [svcstatus, sandbox]

const baseSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`

export const register = async (server) => {
  // setup of Apollo & GraphQL
  const apolloServer = new ApolloServer({
    path: '/graphql',
    typeDefs: [baseSchema, ...services.map(service => service.schema)],
    resolvers: services.map(service => service.resolvers),
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
