import { initServer } from './server'
import child_process from 'child_process'


describe('server/server', () => {

  beforeAll(async () => {
    // setup database
    const result = child_process.spawnSync(
      './docker/setup.sh',
      [ '--database-name=nightlybuilders_test', '--seed=true'],
      { stdio: 'inherit' }
    )
  })

  afterAll(async () => {
    // cleanup database
    const result = child_process.spawnSync(
      './docker/cleanup.sh',
      [ '--database-name=nightlybuilders_test'],
      { stdio: 'inherit' }
    )
  })

  let server = null

  beforeEach(async () => {
    server = await initServer(
      'localhost',
      3100,
      process.env.DATABASE_URL,
    )
  })

  afterEach(async () => {
    // restore & reset
    await server.stop()
    server = null
  })

  it("serves 'OK' if probe_status is available", async () => {
    const response = await server.inject({ url: '/probe_status' })
    expect(response.statusCode).toBe(200)
    expect(response.result).toBe('OK')
  })

  it("sets the state to the provided value on 'POST' requests", async () => {
    const response = await server.inject({
      url: '/probe_status',
      method: 'POST',
      payload: { body: 'DECOMMISSIONED' }
    })
    expect(response.statusCode).toBe(200)
    expect(response.result).toBe('DECOMMISSIONED')
  })

  it("returns 503 as HTTP status code if state is not 'OK'", async () => {
    // prepare
    await server.inject({
      url: '/probe_status',
      method: 'POST',
      payload: { body: 'DECOMMISSIONED' }
    })

    // test
    const response = await server.inject({ url: '/probe_status' })
    expect(response.statusCode).toBe(503)
    expect(response.result).toBe('DECOMMISSIONED')
  })

  it("returns 200 as HTTP status code again if state was set back to 'OK'", async () => {
    // prepare
    await server.inject({
      url: '/probe_status',
      method: 'POST',
      payload: { body: 'DECOMMISSIONED' }
    })

    // intermediate test
    const intermediateResponse = await server.inject({ url: '/probe_status' })
    expect(intermediateResponse.statusCode).toBe(503)

    // set back
    await server.inject({
      url: '/probe_status',
      method: 'POST',
      payload: { body: 'OK' }
    })

    // test
    const response = await server.inject({ url: '/probe_status' })
    expect(response.statusCode).toBe(200)
    expect(response.result).toBe('OK')
  })

  it('provides a GraphQL response for a valid query', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/graphql',
      payload: {
        query: `query { svcStatus { status } }`
      }
    })
    expect(response.statusCode).toBe(200)
    expect(response.result).toBe('{"data":{"svcStatus":{"status":"ok"}}}\n')
  })

  it('fetches a single castle from the database', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/graphql',
      payload: {
        query: `query { castle(id: 1) { title } }`
      }
    })
    expect(response.statusCode).toBe(200)
    expect(response.result).toBe('{"data":{"castle":{"title":"Schönbrunn Palace"}}}\n')
  })

  it('fetches all castles from the database', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/graphql',
      payload: {
        query: `query { castles { data { id } } }`
      }
    })
    expect(response.statusCode).toBe(200)
    expect(response.result).toBe('{"data":{"castles":{"data":[{"id":"1"},{"id":"2"},{"id":"3"},{"id":"4"}]}}}\n')
  })
})
