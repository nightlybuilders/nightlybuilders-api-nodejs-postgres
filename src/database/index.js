import Sequelize from 'sequelize'
import hapiSequelizejs from 'hapi-sequelizejs'

const databaseName = process.env.DATABASE_NAME

export const getModel = (context, name) => {
  const request = context.request
  const db = request.getDb(databaseName)
  return db.getModel(name)
}

export const register = async (server, databaseUrl) => {
  await server.register({
    plugin: hapiSequelizejs,
    options: [
      {
        name: databaseName,                     // identifier
        models: [                               // paths/globs to model files
          './src/services/**/model.js'
        ],
        sequelize: new Sequelize(databaseUrl),  // sequelize instance
        sync: false,                            // sync models - default false
        forceSync: false,                       // force sync (drops tables) - default false
      },
    ],
  })
}
