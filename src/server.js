import Hapi from 'hapi'
import good from 'good'

import * as probe_status from './routing/probe_status'
import * as graphql from './routing/graphql'
import * as database from './database'

export const initServer = async (host, port, databaseUrl) => {
  const server = Hapi.server({
    host,
    port,
  })
  // setup logging
  await server.register({
    plugin: good,
    options: {
      reporters: {
        consoleReporter: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', error: '*' }],
          },
          {
            module: 'good-console',
          },
          'stdout',
        ],
      }
    }
  })

  // database connection
  await database.register(server, databaseUrl)

  // register routes
  await probe_status.register(server)
  await graphql.register(server)

  return server
}
