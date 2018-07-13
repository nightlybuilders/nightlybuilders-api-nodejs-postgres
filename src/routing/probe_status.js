/**
 * Probe Status
 * ------------
 *
 *  Use this endpoint to continuously monitor if the server is up and running.
 *
 *  GET: returns the current 'state' of the server:
 *    - 200 OK: Everything works as expected
 *    - 503 is return if 'state' is anything other than 'OK'
 *
 *  POST: Allows to set the server to a different state.
 *
 *  Possible use case:
 *    - Server runs in production.
 *    - Server is about the be replaced with a newer version (upgraded).
 *    - Set the server's state to anything different than 'OK' via the 'POST'
 *      method, e.g. 'DECOMMISSIONED'. The 'GET' method returns a 503 HTTP
 *      status code from then on.
 *      Other services such as reverse proxies or high availability proxies
 *      have then a chance to re-route requests to a different server.
 *    - Once all currently accepted requests are processed by this server,
 *      the server can be shutdown safely without losing any requests.
 *      The upgrade can be performed and the newer version of the server starts
 *      accepting new requests.
 */

const CONTENT_TYPE = 'text/plain; charset=UTF-8'

let state = 'OK'

const post = function (request, h) {
  state = request.payload.body || 'OK'
  return h.response(state).type(CONTENT_TYPE)
}

const get = function (request, h) {
  return h.response(state)
    .type(CONTENT_TYPE)
    .code(state !== 'OK' ? 503 : 200)
}

export const register = (server) => {
  server.route([
    { method: 'GET',  path: '/probe_status', handler: get },
    { method: 'POST', path: '/probe_status', handler: post }
  ])
}
