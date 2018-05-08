
const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const auth = require('@feathersjs/authentication-client');

const BackendLink = require('./BackendLink');

module.exports = url => {
  const dependencies = {
    feathers,
    io,
    socketio,
    auth
  }

  return new BackendLink(url,dependencies)
}
