
// Parses a cloud device to a JavaScript Class
const Log = require('../log')

class Device{
  constructor(feathers , cloudDevice){
    this.feathers = feathers
    this.cloudDevice = cloudDevice;
  }

  getID(){
    return this.cloudDevice._id;
  }

  getUID(){

  }

  getAlias(){
    return this.cloudDevice.alias;
  }

  getType(){
    return this.cloudDevice.type.type;
  }

  getProperties(){
    return this.cloudDevice.type.properties;
  }

  getLogs(){
    return this.feathers.service('device-logs').find({query:{
      deviceId: this.cloudDevice._id,
      // TODO put this sort directly into the server
      $sort: {
        createdAt: -1
      }
    }})
    .then(logs => logs.data.map(cloudLog => new Log(this.feathers,cloudLog)))
  }

  addLog(log){
    return this.feathers.service('device-logs').create({
      deviceId: this.cloudDevice._id,
      log
    })
    .catch(error => {
      error.data = this.cloudDevice.type.properties;
      throw error
    })
  }

  rempveLog(id){
    return this.feathers.service('device-logs').remove(id)
    .catch(error => {
      error.data = this.cloudDevice.type.properties;
      throw error
    })
  }
}

module.exports = Device;
