/**
 * Parses a cloud device to a JavaScript Class
 */

const errors = require('@feathersjs/errors');
const Log = require('../log')

class Device{
  constructor(feathers , cloudDevice){
    if(feathers === undefined || cloudDevice === undefined)
      throw new errors.BadRequest('Device object must be provided with instances of both feathers and its cloud representative.');

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

  getTypes(){
    return this.cloudDevice.model.types;
  }

  getModel(){
    return this.cloudDevice.model.name;
  }

  getProperties(){
    return this.cloudDevice.model.properties;
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
    throw new errors.NotImplemented('Remove Log Method has not been implemented yet.');
  }
}

module.exports = Device;
