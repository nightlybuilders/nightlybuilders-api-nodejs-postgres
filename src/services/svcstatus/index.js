import { gql } from 'apollo-server-hapi'

export const schema = gql`
  type ServiceStatus {
    status: String!
  }

  extend type Query {
    svcStatus: ServiceStatus
  }
`

export const resolvers = {
  Query: {
    svcStatus: () => ({status: 'ok'})
  }
}