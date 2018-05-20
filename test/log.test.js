const chai = require('chai');
const Log = require('../lib/log');
const errors = require('@feathersjs/errors');

const expect = chai.expect;
const assert = chai.assert;

const mock_cloud_log = {
  _id: "5af9c1a602db4e1917409bf2",
  deviceId: '5af20c454494a020724802ff',
  log: {
    name: 'test_log',
    base64: 'test_base64'
  },
  createdAt: "2018-05-14T17:04:38.065Z",
  updatedAt: "2018-05-14T17:04:38.065Z",
  __v: 0
}

let logs = [mock_cloud_log];

const mock_feathers = {
  /*service: (name) => {
    return {
      create: (data) => {
        switch(name){
          case 'device-logs':
          const created = {
            _id: "5af9c1a602db4e1917409bf2",
            deviceId: data.deviceId,
            log: {
                name: data.log.name,
                base64: data.log.base64
            },
            createdAt: "2018-05-14T17:04:38.065Z",
            updatedAt: "2018-05-14T17:04:38.065Z",
            __v: 0
          }
          created_logs.push(created);
          return Promise.resolve(created); 
          default:
            throw new errors.BadRequest('There is no ' + name + ' service.');
        }
      },
      find: (params) => {
        switch(name){
          case 'device-logs':
            return Promise.resolve({
              limit: 10,
              total: created_logs.length,
              data: created_logs
            });
          default:
            throw new errors.BadRequest('There is no ' + name + ' service.');
        }
      },
      remove: (id) => {
        const posOfLogToRemove = created_logs.findIndex((log, index) => log._id === id);
        return Promise.resolve(created_logs.splice(posOfLogToRemove, 1)[0]);
      }
    } 
  }*/
}

describe('Log Unit Test', () => {
  const log = new Log(mock_feathers, mock_cloud_log);

  it('should throw error if class parameters are not met', done => {
    try {
      const fail = new Log();
    } catch(err) {
      expect(err).to.not.equal(undefined);
      expect(err.code).to.equal(400);
      done();
    }
  });

  it('should create a new log object', done => {
    expect(log).to.not.equal(undefined);
    done();
  });

  it('should return the cloud log\'s data', done => {
    const data = log.getData();
    expect(data.name).to.equal(mock_cloud_log.log.name);
    expect(data.base64).to.equal(mock_cloud_log.log.base64);
    done();
  });

  it('should return the cloud log\'s id', done => {
    expect(log.getID()).to.equal(mock_cloud_log._id);
    done();
  });
});
