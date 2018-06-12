/**
 * Parses a cloud log to a JavaScript Class
 */

const errors = require('@feathersjs/errors');

class Log {
  constructor(feathers,cloudLog){
    if(feathers === undefined || cloudLog === undefined)
      throw new errors.BadRequest('Log object must be provided with instances of both feathers and its cloud representative.');

    this.feathers = feathers;
    this.cloudLog = cloudLog;
  }

  getData(){
    return this.cloudLog.log;
  }

  getID(){
    return this.cloudLog._id;
  }

  /**
   * @deprecated Since version 0.2.0. Will be deleted in version 0.3.0
   */
  remove(){
    throw new errors.NotImplemented('Remove Log Method has not been implemented yet.');
  }
}

module.exports = Log;
