const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const auth = require('@feathersjs/authentication-client');

const socket = io('http://localhost:3030', {
  transports: ['websocket'],
  forceNew: true
});
const client = feathers();

client.configure(socketio(socket));
client.configure(auth())


// Authenticate with the local email/password strategy
client.authenticate({
  strategy: 'local',
	"email": "test@test.com",
	"password": "test"
}).then(() => {
  // Logged in
  console.log('logged in!')

  client.service('device-groups')
  .find({})
  .then(res => {
    console.log(res)
  })
}).catch(e => {
  // Show login page (potentially with `e.message`)
  console.error('Authentication error', e);
});
