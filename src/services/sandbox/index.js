import { gql } from 'apollo-server'
import { getModel } from '../../database'

// Dummy data set. Data is resolved by the 'resolvers' below.
// Data can reside anywhere, e.g. in a file or a database. It's the resolvers
// responsibility to know where to look for the requested data.
const castles = [
  {id: '1', title: 'Schönbrunn Palace',   country: 'Austria'},
  {id: '2', title: 'Hochosterwitz Castle', country: 'Austria'},
  {id: '3', title: 'Akershus Festnig', country: 'Norway'},
  {id: '4', title: 'Bergenhus Festnig', country: 'Norway'},
]

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

// Dummy implementation of the 'resolvers'. In this case, we simply return the
// data which is defined above ('castles' array). In a more complex
// application, we could resolve data from a PostgreSQL database instead.
export const resolvers = {
  Query: {
    castle: (root, args, context, info) => {
      const Castle = getModel(context, 'castles')
      return Castle.findById(args.id).then(r => {
        return r.dataValues
      })
    },
    castles: (root, args, context, info) => {
      return {
        data: castles,
        total: castles && castles.length || 0
      }
    },
  },
}
