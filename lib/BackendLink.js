
const Device = require('./device')

class BackendLink{
  constructor(url , dependencies) {
    this.url = url;
    this.feathers = dependencies.feathers();

    const io = dependencies.io;
    const socketio = dependencies.socketio;
    const auth = dependencies.auth;

    const socket = io(this.url, {
      transports: ['websocket'],
      forceNew: true
    });

    this.feathers.configure(socketio(socket));
    this.feathers.configure(auth());
  }

  authenticate(email,password){
    // Authenticate with the local email/password strategy
    return this.feathers.authenticate({
      strategy: 'local',
    	email,
      password
    })
  }

  //Event Listener
  on(eventName){

  }

  getGroups(){
    return this.feathers.service('device-groups').find({}).then(groups => groups.data)
  }

  getDevices(){
    return this.feathers.service('devices').find({})
    .then(devices => devices.data.map(cloudDevice => new Device(this.feathers,cloudDevice)) )
  }

  getLogs(){

  }

  addLog(){

  }
}

module.exports = BackendLink;
