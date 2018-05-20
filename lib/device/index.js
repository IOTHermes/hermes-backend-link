const errors = require('@feathersjs/errors');
// Parses a cloud device to a JavaScript Class
const Log = require('../log')

class Device{
  constructor(feathers , cloudDevice){
    if(feathers === undefined || cloudDevice === undefined)
      throw new errors.BadRequest('Device object must be provided with instances of feathers and its cloud image.');

    this.feathers = feathers
    this.cloudDevice = cloudDevice;
  }

  getID(){
    return this.cloudDevice._id;
  }

  getUID(){
    throw new errors.NotImplemented('getUID has not been implemented yet.');
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
      deviceId: this.cloudDevice._id
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

  removeLog(id){
    return this.feathers.service('device-logs').remove(id)
    .catch(error => {
      error.data = this.cloudDevice.type.properties;
      throw error
    })
  }
}

module.exports = Device;
