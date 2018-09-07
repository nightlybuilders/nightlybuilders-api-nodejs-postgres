import { gql } from 'apollo-server'
import { map } from 'lodash'
import { getModel } from '../../database'

// A dummy GraphQL type definition
export const schema = gql`
  type CastlesList {
    data: [Castle]
    total: Int
  }

  type Castle {
    id: ID
    title: String
    country: String
  }

  extend type Query {
    castle(id: ID!): Castle
    castles: CastlesList
  }
`

// Dummy implementation of the 'resolvers'. We resolve data from a PostgreSQL
// database.
export const resolvers = {
  Query: {
    castle: (root, args, context, info) => {
      const Castle = getModel(context, 'castles')
      return Castle.findById(args.id).then(r => {
        return r.dataValues
      })
    },
    castles: (root, args, context, info) => {
      const Castle = getModel(context, 'castles')
      return Castle.findAll().then(r => {
        const castles = map(r || [], (entry => {
          return entry.dataValues || {}
        }))
        return {
          data: castles || [],
          total: castles && castles.length || 0
        }
      })
    },
  },
}
