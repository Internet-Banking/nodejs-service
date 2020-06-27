import moment from 'moment'
import http from 'http'
import socketIo from 'socket.io'
import app from './app'
import {PORT} from './config'
import {debug} from './utils'

const server = http.createServer(app)
const io = socketIo(server)

let interval;

io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit('serverSendTime', response);
};

const NAMESPACE = `APP-${moment.utc().toISOString()}`
// eslint-disable-next-line max-len
server.listen(PORT, async () => {
  debug.log(NAMESPACE, 'Internet Banking API is listening on port ' + PORT)
})
