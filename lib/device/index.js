
// Parses a cloud device to a JavaScript Class

class Device{
  constructor(cloudDevice, logMethods){
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

  }

  addLog(){

  }
}

module.exports = Device;
