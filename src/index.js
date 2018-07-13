require('babel-register')({ babelrc: true })

const { initServer } = require('./server')

async function startServer() {
  const host = process.env.HOST
  const port = process.env.PORT || 3000
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error("DATABASE_URL must be provided")
  }

  try {
    const server = await initServer(host, port, databaseUrl)

    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
startServer()
