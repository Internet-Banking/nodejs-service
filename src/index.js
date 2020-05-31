import moment from 'moment'
import http from 'http'
import app from './app'
import {PORT} from './config'
import {debug} from './utils'

const server = http.createServer(app)
const NAMESPACE = `APP-${moment.utc().toISOString()}`
// eslint-disable-next-line max-len
server.listen(PORT, async () => {
  debug.log(NAMESPACE, 'Internet Banking API is listening on port ' + PORT)
})
