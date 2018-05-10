



class Log {
  constructor(feathers,cloudLog){
    this.feathers = feathers;
    this.cloudLog = cloudLog;
  }

  getData(){
    return this.cloudLog.log;
  }

  remove(){

  }
}

module.exports = Log;
